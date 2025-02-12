import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ENVIROMENT from "../config/enviroment.js";
import User from "../models/User.model.js";
import { sendMail, validMailBody, resetPassMailBody } from "../utils/mail.util.js";
import UserRepository from "../repository/user.repository.js";

const QUERY = {
    VERIFICATION_TOKEN: "verification_token",
    RESET_TOKEN: "reset_token",
};

export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const errors = {};

        if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
            errors.email = "Debes ingresar un correo válido.";
        }

        if (!username || !/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
            errors.username = "El nombre de usuario debe ser alfanumérico y tener entre 3 y 20 caracteres.";
        }

        if (!password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
            errors.password = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.";
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                ok: false,
                message: "Errores de validación.",
                errors: errors,
            });
        }

        const user_found = await UserRepository.findUserByEmail(email);

        if (user_found) {
            return res.status(400).json({
                ok: false,
                message: "El usuario de correo electrónico ya existe",
            });
        }

        const verificationToken = jwt.sign({ email }, ENVIROMENT.SECRET_KEY_JWT, { expiresIn: "1d" });

        await sendMail({
            to: email,
            subject: "Valida tu correo electrónico",
            html: validMailBody(QUERY.VERIFICATION_TOKEN, verificationToken),
        });

        const password_hash = await bcrypt.hash(password, 10);

        const new_user = await UserRepository.createUser({
            username,
            email,
            password: password_hash,
            verificationToken,
        });

        return res.status(201).json({
            ok: true,
            message: "Usuario registrado correctamente.",
            data: {
                user: {
                    id: new_user._id,
                    username: new_user.username,
                    email: new_user.email,
                    verified: new_user.verified,
                    createdAt: new_user.createdAt,
                },
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error interno del servidor.",
        });
    }
};

export const verifyEmailController = async (req, res) => {
    try {
        const { [QUERY.VERIFICATION_TOKEN]: verification_token } = req.query;

        if (!verification_token) {
            return res.redirect(`${ENVIROMENT.URL_FRONTEND}/verify-email?status=error&message=Token no válido`);
        }

        let verifiedToken;

        try {
            verifiedToken = jwt.verify(verification_token, ENVIROMENT.SECRET_KEY_JWT);
        } catch (error) {
            return res.redirect(`${ENVIROMENT.URL_FRONTEND}/verify-email?status=error&message=Token expirado o inválido`);
        }

        const user_to_verify = await UserRepository.findUserByEmail(
            verifiedToken.email
        );

        if (!user_to_verify) {
            return res.redirect(`${ENVIROMENT.URL_FRONTEND}/verify-email?status=error&message=Usuario no encontrado`);
        }

        if (!user_to_verify.verificationToken) {
            return res.redirect(`${ENVIROMENT.URL_FRONTEND}/verify-email?status=error&message=El correo ya fue verificado`);
        }

        if (user_to_verify.verificationToken !== verification_token) {
            return res.redirect(`${ENVIROMENT.URL_FRONTEND}/verify-email?status=error&message=Token inválido. Solicita uno nuevo`);
        }

        await UserRepository.verifyUser(user_to_verify._id);
        user_to_verify.verificationToken = null;
        await user_to_verify.save();

        return res.redirect(`${ENVIROMENT.URL_FRONTEND}/verify-email?status=success&message=Correo verificado correctamente`);

    } catch (error) {
        console.error(error);
        return res.redirect(`${ENVIROMENT.URL_FRONTEND}/verify-email?status=error&message=Error interno del servidor`);
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errors = {};

        if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
            errors.email = "Debes ingresar un correo válido.";
        }

        if (!password) {
            errors.password = "Debe introducir una contraseña.";
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                message: "Errores de validación",
                ok: false,
                errors,
            });
        }

        const user_found = await UserRepository.findUserByEmail(email);

        if (!user_found) {
            return res.status(404).json({
                ok: false,
                message: "No hay ningún usuario con este email",
            });
        }

        const is_same_password = await bcrypt.compare(
            password,
            user_found.password
        );

        if (!is_same_password) {
            return res.status(400).json({
                ok: false,
                message: "Contraseña incorrecta",
            });
        }

        const user_info = {
            id: user_found._id,
            username: user_found.username,
            email: user_found.email,
        };

        const access_token = jwt.sign(user_info, ENVIROMENT.SECRET_KEY_JWT, {expiresIn: "1d"});

        return res.status(200).json({
            ok: true,
            message: "Inicio de sesión correcto",
            data: {
                user_info,
                access_token,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
        });
    }
};

export const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
            return res.status(400).json({
                ok: false,
                message: "Debes ingresar un correo válido.",
            });
        }

        const user_found = await UserRepository.findUserByEmail(email);

        if (!user_found) {
            return res.status(200).json({
                ok: true,
                message: "Si el correo existe en nuestro sistema, se ha enviado un enlace para restablecer la contraseña.",
            });
        }

        const reset_token = jwt.sign({ email }, ENVIROMENT.SECRET_KEY_JWT, {
            expiresIn: "1h",
        });

        user_found.resetPasswordToken = reset_token;
        await user_found.save();

        await sendMail({
            to: email,
            subject: "Restablece tu contraseña",
            html: resetPassMailBody(reset_token),
        });

        return res.status(200).json({
            ok: true,
            message: "Si el correo existe en nuestro sistema, se ha enviado un enlace para restablecer la contraseña.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
        });
    }
};

export const resetPasswordController = async (req, res) => {
    try {
        const { reset_token } = req.query;
        const { password } = req.body;

        if (!reset_token) {
            return res.status(400).json({
                ok: false,
                message: "Token inválido o faltante.",
            });
        }

        let email;

        try {
            const decoded = jwt.verify(reset_token, ENVIROMENT.SECRET_KEY_JWT);
            email = decoded.email;
        } catch (error) {
            return res.status(400).json({
                ok: false,
                message: "Token expirado o inválido.",
            });
        }

        const user_found = await UserRepository.findUserByEmail(email);

        if (!user_found || user_found.resetPasswordToken !== reset_token) {
            return res.status(400).json({
                ok: false,
                message: "Token inválido o ya utilizado.",
            });
        }

        if (!password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
            return res.status(400).json({
                ok: false,
                message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.",
            });
        }

        user_found.password = await bcrypt.hash(password, 10);
        user_found.resetPasswordToken = null;
        await user_found.save();

        return res.status(200).json({
            ok: true,
            message: "Contraseña cambiada exitosamente.",
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Error interno del servidor.",
        });
    }
};

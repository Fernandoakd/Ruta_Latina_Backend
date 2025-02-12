import ENVIROMENT from "../config/enviroment.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                ok: false,
                message: "Falta el token",
            });
        }

        const fullToken = authHeader.split(" ");
        
        if (fullToken.length !== 2 || fullToken[0] !== "Bearer") {
            return res.status(401).json({
                ok: false,
                message: "Formato de token no válido",
            });
        }

        const accessToken = fullToken[1];

        const user_info = jwt.verify(accessToken, ENVIROMENT.SECRET_KEY_JWT);
        req.user = user_info;

        return next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            ok: false,
            message: "No autorizado",
        });
    }
};

import Order from "../models/Order.model.js";
import Package from "../models/Package.model.js";
import { sendMail, bookingMailBody } from "../utils/mail.util.js";

export const createOrderController = async (req, res) => {
    try {
        const { packageId, name, phone, email } = req.body;
        const userId = req.user?.id;

        if (!packageId || !name || !phone || !email) {
            return res.status(400).json({
                ok: false,
                message: "Todos los campos son obligatorios.",
            });
        }

        const packageFound = await Package.findById(packageId);
        
        if (!packageFound) {
            return res.status(404).json({
                ok: false,
                message: "El paquete solicitado no existe.",
            });
        }

        const newOrder = new Order({
            user: userId || null,
            package: packageId,
            name,
            phone,
            email,
            status: "Pendiente",
        });

        await newOrder.save();

        await sendMail({
            to: email,
            subject: "Confirmación de solicitud de viaje - Ruta Latina",
            html: bookingMailBody(name, packageFound),
        });

        return res.status(201).json({
            ok: true,
            message: "Solicitud de viaje enviada con éxito. Revisa tu correo.",
            order: newOrder,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error interno del servidor.",
        });
    }
};

export const getUserOrdersController = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ user: userId }).populate(
            "package",
            "destTitle package_img location fees"
        );

        return res.status(200).json({
            ok: true,
            orders,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error interno del servidor.",
        });
    }
};

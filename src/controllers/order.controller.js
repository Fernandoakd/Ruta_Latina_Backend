import OrderRepository from "../repository/order.repository.js";
import PackageRepository from "../repository/package.repository.js";
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

        const packageFound = await PackageRepository.findPackageById(packageId);
        
        if (!packageFound) {
            return res.status(404).json({
                ok: false,
                message: "El paquete solicitado no existe.",
            });
        }

        const newOrder = await OrderRepository.createOrder({
            user: userId || null,
            package: packageId,
            name,
            phone,
            email,
            status: "Pendiente",
        });

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
        const orders = await OrderRepository.findOrdersByUserId(userId);

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

import ENVIROMENT from "../config/enviroment.js";
import transporter from "../config/mail.config.js";

export const sendMail = async ({ to, subject, html }) => {
    try {
        const data = await transporter.sendMail({
            from: ENVIROMENT.EMAIL_USERNAME,
            to,
            subject,
            html,
        });
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const validMailBody = (queryVerificationToken, verificationToken) => {
    const body = `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verificación de Correo - Ruta Latina</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #f3fff5; font-family: Arial, sans-serif;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f3fff5; padding: 20px;">
                    <tr>
                        <td align="center">
                            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                                <tr>
                                    <td align="center">
                                        <h1 style="color: #43B97F; font-size: 24px; font-weight: bold;">Ruta Latina</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #295943; font-size: 24px; font-weight: bold;">Verifica tu Correo Electrónico</td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #A8A7AB; font-size: 16px; padding: 20px;">
                                        ¡Bienvenido a <strong>Ruta Latina</strong>! Para completar tu registro y comenzar a explorar nuestros paquetes de viaje, por favor verifica tu dirección de correo electrónico haciendo clic en el siguiente botón.
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding: 20px;">
                                        <a href="${ENVIROMENT.URL_BACKEND}/api/auth/verify-email?${queryVerificationToken}=${verificationToken}" style="background-color: #43B97F; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 5px; font-size: 18px; font-weight: bold; display: inline-block;">Verificar mi correo</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #A8A7AB; font-size: 14px; padding-top: 20px;">
                                        Si no realizaste este registro, puedes ignorar este correo de manera segura.
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #A8A7AB; font-size: 12px; padding-top: 10px;">
                                        &copy; 2025 Ruta Latina. Todos los derechos reservados.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>`;

    return body;
};

export const resetPassMailBody = (resetToken) => {
    const body = `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Restablecimiento de Contraseña - Ruta Latina</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #f3fff5; font-family: Arial, sans-serif;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f3fff5; padding: 20px;">
                    <tr>
                        <td align="center">
                            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                                <tr>
                                    <td align="center">
                                        <h1 style="color: #43B97F; font-size: 24px; font-weight: bold;">Ruta Latina</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #295943; font-size: 24px; font-weight: bold;">Restablece tu Contraseña</td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #A8A7AB; font-size: 16px; padding: 20px;">
                                        Has solicitado restablecer tu contraseña en <strong>Ruta Latina</strong>. Para continuar con el proceso, haz clic en el botón de abajo y sigue las instrucciones.
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding: 20px;">
                                        <a href="${ENVIROMENT.URL_FRONTEND}/reset-password?reset_token=${resetToken}" 
                                        style="background-color: #43B97F; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 5px; font-size: 18px; font-weight: bold; display: inline-block;">
                                            Restablecer Contraseña
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #A8A7AB; font-size: 14px; padding-top: 20px;">
                                        Si no solicitaste este cambio, puedes ignorar este correo de manera segura.
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #A8A7AB; font-size: 12px; padding-top: 10px;">
                                        &copy; 2025 Ruta Latina. Todos los derechos reservados.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>`;

    return body;
};

export const bookingMailBody = (name, packageFound) => {
    const body = `<!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Confirmación de Reserva - Ruta Latina</title>
                    </head>
                    <body style="margin: 0; padding: 0; background-color: #f3fff5; font-family: Arial, sans-serif;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f3fff5; padding: 20px;">
                            <tr>
                                <td align="center">
                                    <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                                        <tr>
                                            <td align="center">
                                                <h1 style="color: #43B97F; font-size: 24px; font-weight: bold;">Ruta Latina</h1>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="color: #295943; font-size: 24px; font-weight: bold;">Confirmación de Reserva</td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="color: #A8A7AB; font-size: 16px; padding: 20px;">
                                                ¡Hola <strong>${name}</strong>! Hemos recibido tu solicitud para el paquete de viaje <strong>${
        packageFound.destTitle
    }</strong>.
                                                A continuación, encontrarás los detalles de tu reserva. Un agente de Ruta Latina se pondrá en contacto contigo en breve.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="5" border="0" style="background-color: #f3fff5; padding: 10px; border-radius: 8px; text-align: left;">
                                                    <tr>
                                                        <td style="padding: 5px 10px;"><strong>Destino:</strong></td>
                                                        <td>${
                                                            packageFound.destTitle
                                                        }</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 5px 10px;"><strong>Ubicación:</strong></td>
                                                        <td>${
                                                            packageFound.location
                                                        }</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 5px 10px;"><strong>Precio:</strong></td>
                                                        <td>$${
                                                            packageFound.fees
                                                        }</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 5px 10px;"><strong>Fecha de Solicitud:</strong></td>
                                                        <td>${new Date().toLocaleDateString()}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="color: #A8A7AB; font-size: 12px; padding-top: 10px;">
                                                &copy; 2025 Ruta Latina. Todos los derechos reservados.
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>
                    `;
    return body;
};

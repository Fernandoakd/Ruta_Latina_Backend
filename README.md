# Ruta Latina - Backend  

**Ruta Latina** es la API backend de una plataforma de viajes que ofrece paquetes turísticos por toda **Latinoamérica**. La aplicación está desarrollada con **Node.js, Express y MongoDB**, y maneja la autenticación de usuarios y la solicitud de reservas de paquetes turísticos.

## Descripción  

Este proyecto consiste en el desarrollo del backend para una página web de una agencia de viajes. Proporciona funcionalidades como:

- **Autenticación segura** con **JWT** (Inicio de sesión, registro y recuperación de contraseña).
- **Gestión de reservas** de paquetes turísticos.
- **Notificaciones por correo** a los usuarios mediante **Nodemailer**.
- **Seguridad** aplicada a las rutas protegidas mediante middleware de autenticación.
- **Desplegado en Vercel y MongoDB Atlas**.

## Tecnologías utilizadas  

- **Node.js**: Entorno de ejecución de JavaScript para backend.
- **Express.js**: Framework minimalista para construir APIs con Node.js.
- **MongoDB + Mongoose**: Base de datos NoSQL y ODM para modelado de datos.
- **JWT (jsonwebtoken)**: Autenticación y autorización basada en tokens.
- **bcrypt**: Encriptación de contraseñas.
- **dotenv**: Manejo de variables de entorno.
- **Nodemailer**: Envío de correos electrónicos.
- **CORS**: Permitir solicitudes desde diferentes dominios.
- **Cloudinary (Opcional)**: Servicio de almacenamiento de imágenes (se utilizó para precargar imágenes de paquetes en la fase inicial).

## Requisitos  

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes requisitos:

- Node.js (versión 14 o superior)
- npm (Node Package Manager)
- MongoDB Atlas configurado o una base de datos MongoDB local

## Instalación y ejecución  

Para clonar y ejecutar este proyecto en tu máquina local, sigue estos pasos:

1. Clona el repositorio en tu computadora:
    ```bash
    git clone https://github.com/Fernandoakd/Ruta_Latina_Backend.git
    ```

2. Navega hasta el directorio del proyecto:
    ```bash
    cd Ruta_Latina_Backend
    ```

3. Instala las dependencias del proyecto:
    ```bash
    npm i
    ```

4. Configuralas variables de entorno en un archivo **.env** con los siguientes valores:
    PORT=3000
    JWT_SECRET=tu_secret_jwt
    EMAIL_USERNAME=tu_email@gmail.com
    EMAIL_PASSWORD=tu_contraseña
    CLOUDINARY_CLOUD_NAME=tu_cloud_name
    CLOUDINARY_API_KEY=tu_api_key
    CLOUDINARY_API_SECRET=tu_api_secret

    Nota: Las variables de Cloudinary solo se usaron para precargar imágenes en Postman. No es necesario configurarlas si no se van a subir imágenes desde la app.


5. Ejecuta el proyecto en modo de desarrollo:
    ```bash
    npm run dev
    ```

6. Abre tu navegador y visita `http://localhost:3000` o `https://ruta-latina-backend.vercel.app` para ver la aplicación en funcionamiento, si esta URL no funciona, verificar el puerto en el cual generó la vista de la página en la terminal. Es importante aclarar que como estos enlaces hacen referencias al API backend no se verá una interfaz, pero se podrán realizar peticiones y visualizar sus respuestas por consola.


## Despliegue

El proyecto se encuentra desplegado en [Vercel](https://vercel.com/). 
Podrás acceder a la aplicación en línea a través de este enlace: [Ruta Latina Backend en Vercel](https://ruta-latina-backend.vercel.app).

## Estructura del Proyecto

El proyecto sigue la estructura de un servidor Express con arquitectura modular.

Los archivos principales incluyen:

- `server.js`: Punto de entrada del servidor Express.
- `auth.controller.js`: Maneja el inicio de sesión, registro y recuperación de contraseña.
- `order.controller.js`: Gestiona las solicitudes de reserva de paquetes.
- `auth.middleware.js`: Middleware para proteger rutas con JWT.
- `mail.util.js`: Funciones para el envío de correos electrónicos.

## Contribuciones

Este proyecto está abierto a contribuciones. Si deseas colaborar, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme a través de mi perfil de GitHub.

---

¡Gracias por visitar Ruta Latina!


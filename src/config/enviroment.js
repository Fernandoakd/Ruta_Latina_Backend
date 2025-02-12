import dotenv from "dotenv";

dotenv.config();

const ENVIROMENT = {
    PORT: process.env.PORT || 3000,
    SECRET_KEY_JWT: process.env.JWT_SECRET,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    URL_FRONTEND: process.env.URL_FRONTEND,
    URL_BACKEND: process.env.URL_BACKEND,
    API_KEY: process.env.API_KEY,
};

export default ENVIROMENT;

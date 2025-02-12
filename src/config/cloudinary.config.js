import { v2 as cloudinary } from "cloudinary";
import ENVIROMENT from "../config/enviroment.js";

cloudinary.config({
    cloud_name: ENVIROMENT.CLOUDINARY_CLOUD_NAME,
    api_key: ENVIROMENT.CLOUDINARY_API_KEY,
    api_secret: ENVIROMENT.CLOUDINARY_API_SECRET,
});

export default cloudinary;

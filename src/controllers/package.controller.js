import Package from "../models/Package.model.js";
import cloudinary from "../config/cloudinary.config.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "paquetes",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const upload = multer({ storage }).array("packageImg", 10);

export const uploadPackages = async (req, res) => {
    try {
        const packagesData = req.body;
        const uploadedPackages = [];

        for (const pkg of packagesData) {
            let packageImageUrl = pkg.package_img;

            if (!packageImageUrl && req.files) {
                const uploadedImage = await cloudinary.uploader.upload(
                    req.files[0].path
                );
                packageImageUrl = uploadedImage.secure_url;
            }

            if (!packageImageUrl) {
                return res.status(400).json({
                    ok: false,
                    message: "Se requiere la URL o el archivo de la imagen para cada paquete",
                });
            }

            const newPackage = new Package({
                package_img: packageImageUrl,
                destTitle: pkg.destTitle,
                location: pkg.location,
                grade: pkg.grade,
                fees: pkg.fees,
                description: pkg.description,
                zone: pkg.zone,
                popularity: pkg.popularity,
            });

            await newPackage.save();
            uploadedPackages.push(newPackage);
        }

        res.status(201).json({
            ok: true,
            message: "Paquetes cargados correctamente",
            data: uploadedPackages,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: "Error en el servidor",
        });
    }
};

export const getPackages = async (req, res) => {

    try {
        const packages = await Package.find();
        return res.status(200).json({
            ok: true,
            data: packages,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error en el servidor",
        });
    }
};

export const getPackage = async (req, res) => {
    
    try {
        const { package_id } = req.params;
        const packageData = await Package.findById(package_id);

        if (!packageData) {
            return res.status(404).json({
                ok: false,
                message: "Paquete no encontrado",
            });
        }

        return res.status(200).json({
            ok: true,
            data: packageData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error en el servidor",
        });
    }
};

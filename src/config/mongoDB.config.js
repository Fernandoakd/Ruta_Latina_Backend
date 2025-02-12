import mongoose from "mongoose";

mongoose
    .connect("mongodb://localhost:27017/ruta-latina")
    .then(() => {
        console.log("Conexion con mongoDB exitosa!");
    })
    .catch((error) => {
        console.error("MONGODB CONNECTION ERROR:", error);
    });

export default mongoose;

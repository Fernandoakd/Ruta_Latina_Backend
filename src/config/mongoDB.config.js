import mongoose from "mongoose";

mongoose
    .connect("mongodb+srv://fernandoakdvaldez:skHwaub99XVMGumr@rutalatinamdb.rds7v.mongodb.net/rutalatina?retryWrites=true&w=majority&appName=RutaLatinaMDB")
    .then(() => {
        console.log("Conexion con mongoDB exitosa!");
    })
    .catch((error) => {
        console.error("MONGODB CONNECTION ERROR:", error);
    });

export default mongoose;

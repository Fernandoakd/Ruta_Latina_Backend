import Package from "../models/Package.model.js";

class PackageRepository {
    async createPackage(packageData) {
        try {
            const newPackage = new Package(packageData);
            return await newPackage.save();
        } catch (error) {
            console.error("Error al crear el paquete:", error);
            throw new Error("Error al crear el paquete.");
        }
    }

    async findAllPackages() {
        try {
            return await Package.find();
        } catch (error) {
            console.error("Error al obtener los paquetes:", error);
            throw new Error("Error al obtener los paquetes.");
        }
    }

    async findPackageById(packageId) {
        try {
            return await Package.findById(packageId);
        } catch (error) {
            console.error("Error al obtener el paquete:", error);
            throw new Error("Error al obtener el paquete.");
        }
    }
}

export default new PackageRepository();

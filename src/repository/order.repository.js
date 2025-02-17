import Order from "../models/Order.model.js";

class OrderRepository {
    async createOrder(orderData) {
        try {
            const newOrder = new Order(orderData);
            return await newOrder.save();
        } catch (error) {
            console.error("Error al crear la orden:", error);
            throw new Error("Error al crear la orden.");
        }
    }

    async findOrdersByUserId(userId) {
        try {
            return await Order.find({ user: userId }).populate(
                "package",
                "destTitle package_img location fees"
            );
        } catch (error) {
            console.error("Error al obtener las órdenes:", error);
            throw new Error("Error al obtener las órdenes.");
        }
    }
}

export default new OrderRepository();

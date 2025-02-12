import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        required: true,
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    status: {
        type: String,
        enum: ["Pendiente", "Confirmado", "Cancelado"],
        default: "Pendiente",
    },
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

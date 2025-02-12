import express from "express";
import { createOrderController, getUserOrdersController } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create", createOrderController);
router.get("/my-orders", getUserOrdersController);

export default router;

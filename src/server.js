import express from "express";
import ENVIROMENT from "./config/enviroment.js";
import mongoose from "./config/mongoDB.config.js";
import cors from "cors";

const app = express();
const PORT = ENVIROMENT.PORT;

app.use(
    cors({
        origin: ENVIROMENT.URL_FRONTEND,
    })
);

app.use(express.json({ limit: "5mb" }));

import authRouter from "./routes/auth.route.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import packageRouter from "./routes/package.route.js";
import orderRouter from "./routes/order.route.js";

app.use("/api/auth", authRouter);

app.use("/api/packages", packageRouter);


app.use("/api/orders", authMiddleware, orderRouter);

app.listen(PORT, () => {
    console.log(`El servidor se esta ejecutando en http://localhost:${PORT}`);
});

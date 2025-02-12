import express from "express";
import { uploadPackages, getPackages, getPackage} from "../controllers/package.controller.js";

const packageRouter = express.Router();

packageRouter.post("/upload-packages", uploadPackages);
packageRouter.get("/", getPackages);
packageRouter.get("/:package_id", getPackage);

export default packageRouter;

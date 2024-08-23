import express from "express";
import * as PropertyController from "../controllers/property.controller";
import { AuthMiddleware } from "../middlewares";

const router = express.Router();

// routerss
router.post("/create", [AuthMiddleware], PropertyController.createProperty);
router.post("/all", [AuthMiddleware], PropertyController.listProperty);
router.post("/read", [AuthMiddleware], PropertyController.detailProperty);

export default router;

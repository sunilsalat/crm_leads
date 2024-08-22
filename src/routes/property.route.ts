import express from "express";
import * as PropertyController from "../controllers/property.controller";

const router = express.Router();

// routerss
router.post("/create", [], PropertyController.createProperty);
router.post("/all", [], PropertyController.listProperty);
router.post("/read", [], PropertyController.detailProperty);

export default router;

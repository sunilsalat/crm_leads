import express from "express";
import * as LeadController from "../controllers/lead.controller";
import { AuthMiddleware, ThrowValidationErrors } from "../middlewares";

const router = express.Router();

// routerss
router.post("/create", [AuthMiddleware], LeadController.createLead);
router.post("/all", [AuthMiddleware], LeadController.getAllLeads);
router.post("/comment", [AuthMiddleware], LeadController.addLeadInquiry);
router.post("/read", [AuthMiddleware], LeadController.getLeadDetail);

export default router;

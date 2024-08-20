import express from "express";
import * as LeadController from "../controllers/lead.controller";
import { AuthMiddleware, ThrowValidationErrors } from "../middlewares";

const router = express.Router();

// routerss
router.post("/create", [], LeadController.createLead);
router.post("/all", [], LeadController.getAllLeads);
router.post("/comment", [], LeadController.addLeadInquiry);
router.post("/read", [], LeadController.getLeadDetail);

export default router;

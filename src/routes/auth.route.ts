import express from "express";
import * as UserController from "../controllers/user.controller";
import { AuthMiddleware, ThrowValidationErrors } from "../middlewares";

const router = express.Router();

// routerss
router.post("/register", [], UserController.register);
router.post("/login", [], UserController.login);

export default router;

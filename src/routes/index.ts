import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import * as authController from "../controllers/auth.controller";
import * as dashboardController from "../controllers/dashboard.controller";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/dashboard/getUsers", authMiddleware, dashboardController.getUsers);
router.put("/dashboard/blockUsers", authMiddleware, dashboardController.blockUsers);
router.put("/dashboard/unblockUsers", authMiddleware, dashboardController.unblockUsers);
router.delete("/dashboard/deleteUsers", authMiddleware, dashboardController.deleteUsers);

export default router;

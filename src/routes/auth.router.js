import { Router } from "express";
import { methods as authController } from "./../controllers/auth.controller";
const router = Router();

router.post("/api/login", authController.loginUser);
router.post('/api/change-password', authController.changePassword);
router.post("/api/forgot-password", authController.forgotPassword);

export default router;

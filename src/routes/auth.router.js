import { Router } from "express";
import { methods as authController } from "./../controllers/auth.controller";
const router = Router();

router.post("/api/login", authController.loginUser);
router.post('/api/reset-password', authController.resetPassword);
router.post('/api/change-password', authController.changePassword);

export default router;

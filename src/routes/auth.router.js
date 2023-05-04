import { Router } from "express";
import { methods as authController } from "./../controllers/auth.controller";
const router = Router();

router.post("/api/login", authController.loginUser);

export default router;

import { Router } from "express";
import { methods as userController } from "../controllers/users.controller";
const router = Router();

router.get("/api/users", userController.getAllUsers)
router.get("/api/register-users", userController.registerUsers)
export default router;

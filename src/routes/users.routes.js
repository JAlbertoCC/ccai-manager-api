import { Router } from "express";
import { methods as userController } from "../controllers/users.controller";
const router = Router();

router.get("/api/users", userController.getAllUsers)
router.post("/api/users-register", userController.checkingUser)

export default router;

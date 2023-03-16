import { Router } from "express";
import { methods as userController } from "../controllers/users.controller";
const router = Router();

router.get("/api/users", userController.getAllUsers)
router.post("/api/users-checking", userController.checkingUser);
router.get("/api/register-users", userController.registerUsers)

router.post("/api/visit-register", userController.registerVisits);

export default router;

import { Router } from "express";
import { methods as userController } from "../controllers/users.controller";
const router = Router();

router.get("/api/users", userController.getAllUsers);
router.post("/api/register-users", userController.registerUsers);

router.post("/api/users-checking", userController.checkingUser);
router.post("/api/visit-register", userController.registerVisits);

router.get("/api/consulting-students",userController.consultingStudents);

export default router;

import { Router } from "express";
import { methods as userController } from "../controllers/users.controller";

const router = Router();

router.get("/api/users", userController.getAllUsers);
router.post("/api/register-users", userController.registerUsers);

router.post("/api/users-checking", userController.checkingUser);
router.post("/api/visit-register", userController.registerVisits);

router.get("/api/consulting-students",userController.consultingStudents);

router.get("/api/list-service", userController.listSerice);
router.get("/api/list-carrer", userController.listCarrer);

router.get("/api/list-sex", userController.listServices);

router.get("/api/list-resources", userController.listResources);
router.get("/api/list-teacher", userController.listTeacher);

router.get("/api/list-proyects", userController.listProyects);
router.get("/api/list-registerStudents",userController.listStudentsRegister);
export default router;

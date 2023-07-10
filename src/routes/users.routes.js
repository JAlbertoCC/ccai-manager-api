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
//router.get(`/api/list-proyectInfo/:projectId`, userController.listProyectInfo, );
//prueba para gestionar el control de urls
// router.get('/api/list-proyectInfo/:projectId', verifyToken, (req, res, next) => {
//     // Verifica el tipo de usuario antes de permitir el acceso a la ruta
//     if (req.user.userType === 'alumno') {
//       res.status(403).json({
//         status: 403,
//         message: 'Acceso denegado. No tienes permiso para realizar esta acción.'
//       });
//     } else {
//       next();
//     }
//   }, userController.listProyectInfo);

export default router;

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
<<<<<<< HEAD
router.get(`/api/list-proyectInfo/:projectId`, userController.listProyectInfo);
=======
//router.get(`/api/list-proyectInfo/:projectId`, userController.listProyectInfo, );
//prueba para gestionar el control de urls
router.get('/api/list-proyectInfo/:projectId', verifyToken, (req, res, next) => {
    // Verifica el tipo de usuario antes de permitir el acceso a la ruta
    if (req.user.userType === 'alumno') {
      res.status(403).json({
        status: 403,
        message: 'Acceso denegado. No tienes permiso para realizar esta acción.'
      });
    } else {
      next();
    }
  }, userController.listProyectInfo);
>>>>>>> 1c4b68e16c1e3e70b5bc7a9e458ed54ad3b17c34

export default router;

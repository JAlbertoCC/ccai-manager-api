import { Router } from "express";
import { methods as userController } from "../controllers/users.controller";
const router = Router();
//NOTA FALTA ORGANIZAR LAS URLS DEL API EN GRUPOS DE FUNCION 
//- VIEW
//- CREAR
//- EDITAR
//- ELIMINAR


// - view 

router.get("/api/consulting-students",userController.consultingStudents); // view users tabla de usuarios registrado
router.get("/api/list-service", userController.listSerice); // lista de los servicios a prestar del alumno
router.get("/api/list-carrer", userController.listCarrer); // lista de las carreras del tese
router.get("/api/users", userController.getAllUsers); // view muestra todos los usuarios VERIFICAR DONDE SE IMPLEMENTA EN EL FRONT
// VIEW RECURSOS
router.get("/api/list-resources", userController.listResources);// view lista de materiales view resources-tabla-materiales
router.get("/api/list-teacher", userController.listTeacher); //lista de de profesores view resources-tabla-docente  
router.get("/api/list-registerStudents",userController.listStudentsRegister); //view resources-tabla-alumno


router.get("/api/list-proyects", userController.listProyects); //view proyects table proyectos
// mandar el projectID para que funcione
router.get("/api/consultingInfo-Project/:projectId",userController.listProjectInfo); // devuelve la informacion del proyecto
router.get("/api/Students-InProject/:projectId",userController.listStudentsInProject);  // devuelve estudiantes de un proyecto
router.get("/api/list-ResourceBorrowedInProject/:projectId",userController.listResourceBorrowedInProject); // devuelve materiales prestados de los proyectos    


//- CREAR
router.post("/api/register-users", userController.registerUsers); // procedimiento para registrar alumnos nuevos
// router.post("/api/users-checking", userController.checkingUser); // URGE REVISAR FUNCION FALTA CREAR PROCEDIMIENTO
// router.post("/api/visit-register", userController.registerVisits); // URGE PROCEDIMIENTO PARA REGISTRAR VISITAS FALTA CREAR PROCEDIMIENTO
router.post("/api/register-StudentInProject", userController.registerStudentInProject); // agregar integrantes (alumnos) a los prpyectos Proyect-detail

//- EDITAR


//- ELIMINAR
  

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

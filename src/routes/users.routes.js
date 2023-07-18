import { Router } from "express";
import { methods as userController } from "../controllers/users.controller";
const router = Router();
//NOTA FALTA ORGANIZAR LAS URLS DEL API EN GRUPOS DE FUNCION 
//- VIEW
//- CREAR
//- EDITAR
//- ELIMINAR


//view 
router.get("/api/consulting-students",userController.consultingStudents); // view users tabla de usuarios con campo Null   (correcto)
router.get("/api/list-service", userController.listService); // lista de los servicios a prestar del alumno                (correcto)
router.get("/api/list-carrer", userController.listCarrer); // lista de las carreras del tese                               (correcto)
router.get("/api/users", userController.getAllUsers); // view muestra todos los usuarios VERIFICAR DONDE SE IMPLEMENTA EN EL FRONT  (correcto)
router.get("/api/list-ResourceBorrowedInProject/:projectId",userController.listResourceBorrowedInProject);   // enlitsa los recursos dependiendo el proyecto  (correcto)
router.get("/api/consultingInfo-Project/:projectId",userController.listProjectInfo); // informacion del proyecto  (correcto)
router.get("/api/Students-InProject/:projectId",userController.listStudentsInProject);  // devuelve estudiantes de un proyecto  (correcto)
router.get("/api/Adviser-InProject/:projectId",userController.listStudentsInProject);  //muestra los asesores dependiendo el id_project   (correcto)


router.post("/api/register-users", userController.registerUsers); // procedimiento para registrar alumnos nuevos
router.post("/api/users-checking", userController.checkingUser); // URGE REVISAR FUNCION        (No se ha creado)
router.post("/api/visit-register", userController.registerVisits); // URGE PROCEDIMIENTO PARA REGISTRAR VISITAS  (No se ha creado)
router.post("/api/register-StudentInProject", userController.registerStudentInProject); // registrar student en un proyecto  (post)
router.post("/api/register-ResourceInProject", userController.registerResourceInProject);  // registrar un recurso en un proyecto (post)
router.post("/api/register-AdviserInProject", userController.registerAdviserInProject);  // registrar un recurso en un proyecto (post)



router.get("/api/list-sex", userController.listServices); // lista de tipo de sexo no enlista el sexo solo regresa los servicios a prestar de alumnos URGE CORREGIR

router.get("/api/list-resources", userController.listResources);// view lista de materiales view resources-tabla-materiales
router.get("/api/list-teacher", userController.listTeacher); //lista de de profesores view resources-tabla-docente  

router.get("/api/list-proyects", userController.listProyects); //view proyects table proyectos
router.get("/api/list-registerStudents",userController.listStudentsRegister); //view resources-tabla-alumno
router.get(`/api/list-proyectInfo/:projectId`, userController.listProyectInfo, );

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

import { getConnection } from "./../database/database"
import { generateHash } from "../utils/hash";
// procedimiento para registrar alumnos nuevos
const registerUsers = async (req, res) => {
  try {
    const connection = await getConnection();
    const { matricula, name, first_name, second_name, address, cell_phoneNumber, gender, carrer, service_provide, institutional_emailEs, password } = req.body;
    console.log('req.body: ', req.body);
    if (!matricula) {
      res.status(400).json({
        status: 400,
        error: "Bad Request.",
        message: "Ingrese sus datos completos",
      });
    } else {
      const hash = generateHash(password);
      const result = await connection.query(`call sp_student_register('${matricula}','${name}','${first_name}','${second_name}','${address}','${cell_phoneNumber}','${gender}','${carrer}','${service_provide}','${institutional_emailEs}','${hash}', @mensaje, @succes);`);
      console.log('result: ', result)
      res.status(200).json({
        status: 200,
        ...result[0][0]
      });
    }
  } catch (error) {
    console.log('error.message: ', error.message)
    res.status(500)
      .json({
        message: error.message,
        status: 500
      });
  }
};

// view muestra todos los usuarios VERIFICAR DONDE SE IMPLEMENTA EN EL FRONT
const getAllUsers = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM all_users;");
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
 // lista de las carreras del tese
const listCarrer = async(req,res)=>{
  try{
    const connection = await getConnection();
    const result = await connection.query("select * from all_career");  
    res.json(result);
  } catch(error){
    res.status(500);
    res.send(error.message);
  }
}
// lista de los servicios a prestar del alumno
const listSerice = async(req,res)=>{
  try{
    const connection = await getConnection();
    const result = await connection.query("select * from all_service");
    
    res.json(result);
  } catch(error){
    res.status(500);
    res.send(error.message);
  }
}
// informacion del proyecto VIEW: Proyects
const listProyects = async(req,res) =>{
  try{
    const connection = await getConnection();
    const result = await connection.query("select * from ProyectsRegisters");
    
    res.json(result);
  } catch(error){
    res.status(500);
    res.send(error.message);
  }
}
//VIEW Project-deatail
//iNFORMACION DEL PROYECTO VISTA: PROJECTDETAIL
const listProjectInfo = async(req,res) =>{
  try{
    const  projectId  = req.params.projectId;
    const connection = await getConnection();
    const result = await connection.query(`select * from projectInfo where id_project =${projectId}`);
    
    res.json(result);
  } catch(error){
    res.status(500);
    res.send(error.message);
  }
};
// Miembros de un proyecto -Alumnos que se asignana a un proyecto
const listStudentsInProject = async(req,res) =>{
  try{
    const  projectId  = req.params.projectId;
    const connection = await getConnection();
    const result = await connection.query(`select * from studentInProyect where id_project =${projectId};`);
    
    res.json(result);
  } catch(error){
    res.status(500);
    res.send(error.message);
  }
};
// Recursos de un proyecto -Recursos prestados dentro del prpyecto
const listResourceBorrowedInProject = async(req,res) =>{
  try{
    const  projectId  = req.params.projectId;
    const connection = await getConnection();
    const result = await connection.query(`select * from resource_borrowedInProject where id_project =${projectId}`);
    
    res.json(result);
  } catch(error){
    res.status(500);
    res.send(error.message);
  }
};
// Asesores de un proyecto -Asesores del proyecto 
const adviserInProject = async(req,res) =>{
  try{
    const  projectId  = req.params.projectId;
    const connection = await getConnection();
    const result = await connection.query(`select * from adviserInProject where id_project =${projectId};`);
    
    res.json(result);
  } catch(error){
    res.status(500);
    res.send(error.message);
  }
};

// view RESOURCES 
// lista de todos los recusos existentes en el CCAI
const listResources = async(req,res)=>{
  try{
    const connection = await getConnection();
    const result = await connection.query("select * from all_resources")
    res.json(result);
  } catch(error){
    res.status(500)
    res.send(error.message)
  }
}
// lista de todos los profesores, docentes, asesores del ccai
const listTeacher = async(req,res) =>{
  try{
    const connection = await getConnection();
    const result = await connection.query("select * from teacher_view");
    
    res.json(result);
  } catch(error){
    res.status(500);
    res.send(error.message);
  }
};
// lista de todos los alumnos registrados en el ccai
const listStudentsRegister = async(req,res) =>{
  try{
    const connection = await getConnection();
    const result = await connection.query("select * from dataregisterstudents");
    
    res.json(result);
  } catch(error){
    res.status(500);
    res.send(error.message);
  }
};


// view Proyect-detail
// Agregar Estudiantes, integrantes a un proyecto segun el ID del proyecto
const registerStudentInProject = async (req, res) => {
  try {
    const connection = await getConnection();
    const { matricula, id_Project} = req.body;
    console.log('req.body: ', req.body);
    if (!matricula) {
      res.status(400).json({
        status: 400,
        error: "Bad Request.",
        message: "Ingrese sus datos completos",
      });
    } else {
      const hash = generateHash(password);
      const result = await connection.query(`call sp_addStudent_inProyect('${matricula}','${id_Project},, @mensaje, @succes');`);
      res.status(200).json({
        status: 200,
        message: "Alumno añadido al proyecto"
      });
    }
  } catch (error) {
    console.log('error.message: ', error.message)
    res.status(500)
      .json({
        message: error.message,
        status: 500
      });
  }
};
// Agregar Materiales prestados a un proyecto segun el ID del proyecto
const registerResourceInProject = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_resourceB, id_projectR,amountP} = req.body;
    console.log('req.body: ', req.body);
    if (!matricula) {
      res.status(400).json({
        status: 400,
        error: "Bad Request.",
        message: "Ingrese sus datos completos",
      });
    } else {
      const hash = generateHash(password);
      const result = await connection.query(`call sp_addResourceInProject('${id_resourceB}','${id_projectR},'${amountP},@mensaje, @succes');`);
      res.status(200).json({
        status: 200,
        message: "Alumno añadido al proyecto"
      });
    }
  } catch (error) {
    console.log('error.message: ', error.message)
    res.status(500)
      .json({
        message: error.message,
        status: 500
      });
  }
};
// Agregar Docentes, Asesores a un proyecto segun el ID del proyecto
const registerAdviserInProject = async (req, res) => {
  try {
    const connection = await getConnection();
    const { matriculaAdviser, matriculaStudent,typeAdviser} = req.body;
    console.log('req.body: ', req.body);
    if (!matricula) {
      res.status(400).json({
        status: 400,
        error: "Bad Request.",
        message: "Ingrese sus datos completos",
      });
    } else {
      const hash = generateHash(password);
      const result = await connection.query(`call sp_addAdviserInProject('${matriculaAdviser}','${matriculaStudent},'${typeAdviser},@mensaje, @succes');`);
      res.status(200).json({
        status: 200,
        message: "Alumno añadido al proyecto"
      });
    }
  } catch (error) {
    console.log('error.message: ', error.message)
    res.status(500)
      .json({
        message: error.message,
        status: 500
      });
  }
};
// -----------------------------------------------------------------------------------------------------

// Procedimientos por crear
const checkingUser = async (req, res) => {
  try {
    const connection = await getConnection();
    const { matricula } = req.body;

    if (!matricula) {
      res.status(400).json({
        error: "Bad Request.",
        message: "Ingrese la matricula del alumno",
      });
    } else {
      const result = await connection.query(
        `CALL checking_student(${matricula}, @matricula)`
      );

      res.status(200).json({
        result: {
          ...result[0]["0"],
        },
      });
    }
  } catch (error) {
    res.status(500)
      .json(error.message);
  }
};
const registerVisits = async (req, res) => {
  try {
    const connection = await getConnection();
    const { name, maternal_surname, paternal_surname, email, is_entry } = req.body;
    
    if ( name || maternal_surname || paternal_surname || email || is_entry) {
      const result = await connection.query(`call checking_visits('${name}', '${maternal_surname}', '${paternal_surname}', '${email}', '${is_entry}')`);

      res.status(200)
      .json({
        status: "OK", 
        message: "Datos registrdos con exito",
      });
    } else if (name || !maternal_surname || !paternal_surname || email || is_entry == false ){
      const result = await connection.query(`call checking_visits('${name}','${email}', '${is_entry}')`);
    
      res.status(200)
      .json({
        status: "OK", 
        message: "Datos registrdos con exito",
      });
    } else if (!name || !maternal_surname || !paternal_surname || !email) {
      res.status(400).json({
        error: "Bad Request.",
        message: "Ingresa los datos correctos.",
      });
    }
  } catch (error) {
    res.status(500)
      .json({
        status: 500,
        message: error.message
      });
  }
};

// ?? ELIMINAR SI NO SE OCUPAN jhon favor de verificar esto 
//view solitudes de alumnos = activ se muestra el alumno cuando esta en null (recien registrados)
const consultingStudents = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("select * from consultingStudents");
    const startDate = new Date(result[0].start_date);
    const formattedDate = startDate.toISOString().split('T')[0];

    const response = [{
      matricula: result[0][0].matricula,
      name: result[0][0].name,
      first_name: result[0][0].first_name,
      second_name: result[0][0].second_name,
      name_career: result[0][0].name_career,
      service_provide: result[0][0].service_provide,
      start_date: formattedDate 

    }];
    res.json(response);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// eliminr despuies de confirmar su desuso 
const listProyectInfo = async (req, res) => {
  try {
    const connection = await getConnection();
    const { projectId } = req.body;
    console.log("req.body",req.body);
    if (!projectId) {
      res.status(400).json({
        status: 400,
        error: "Bad Request.",
        message: "Proyecto no encontrado ",
      });
    } else {
      const result = await connection.query(`SELECT * FROM projectDetail WHERE projectId = ${projectId};`);
      console.log('result: ', result)
      res.status(200).json({
        status: 200,
        ...result[0][0]
      });
    }
  } catch (error) {
    console.log('error.message: ', error.message)
    res.status(500)
      .json({
        message: error.message,
        status: 500
      });
  }
};

export const methods = {
  getAllUsers,
  checkingUser,
  registerUsers,
  registerVisits,
  listSerice,
  listCarrer,
  listResources,
  listTeacher,
  listProyects,
  listStudentsRegister,
  listResourceBorrowedInProject,
  listProjectInfo,
  listStudentsInProject,
  adviserInProject,
  // add info al proyecto alumno, recursos, asesores
  registerStudentInProject,
  registerResourceInProject,
  registerAdviserInProject
};
// crear controlador , crear otra ruta sandri.routes.js

// POSBLE MEJORA CREAR NUEVOS ARCHIVOS DE CONTROLADOR Y GESTIONAR POR ACCION SEGUN EL CRUD
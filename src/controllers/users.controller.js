import { getConnection } from "./../database/database"
import { generateHash } from "../utils/hash";

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

const consultingStudents = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("select * from consultingStudents");
    const startDate = new Date(result[0].start_date);
    const formattedDate = startDate.toISOString().split('T')[0];

    const response = [{
      matricula: result[0].matricula,
      name: result[0].name,
      first_name: result[0].first_name,
      second_name: result[0].second_name,
      name_career: result[0].name_career,
      service_provide: result[0].service_provide,
      start_date: formattedDate 

    }];
    res.json(response);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

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

const listServices = async(req,res)=>{
  try{
    const connection = await getConnection();
    const result = await connection.query("select * from service");
    
    res.json(result);
  } catch(error){
    res.status(500);
    res.send(error.message);
  }
}

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
  consultingStudents,
  listSerice,
  listCarrer,
  listServices,
  listResources,
  listTeacher,
  listProyects,
  listStudentsRegister,
  listProyectInfo
};
// crear controlador , crear otra ruta sandri.routes.js
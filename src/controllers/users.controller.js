import { getConnection } from "./../database/database"
import { generateHash } from "../utils/hash";

const getAllUsers = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM all_users;");
    console.log(result);
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
    console.log('matricula', matricula)
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
    console.log(error)
    res.status(500)
      .json(error.message);
  }
};

const registerUsers = async (req, res) => {
  try {
    const connection = await getConnection();
    const {
      matricula,
      name,
      lastnamef,
      lastnamem,
      adress,
      phone,
      gender,
      career,
      service,
      institutional_email,
      password,
    } = req.body;

    if (!matricula) {
      res.status(400).json({
        status: 400,
        error: "Bad Request.",
        message: "Ingrese sus datos completos",
      });
    } else {
      const hash = generateHash(password);
      const result = await connection.query(`call sp_studen_register('${matricula}', '${name}', '${lastnamef}', '${lastnamem}', '${adress}', '${phone}', '${gender}', '${career}', '${service}', '${institutional_email}', '${hash}', @mensaje, @succes)`);
      console.log('result => ', result)
      res.status(200).json(result[0]);
    }
  } catch (error) {
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
    console.log(req.body)
    
    if ( name || maternal_surname || paternal_surname || email || is_entry == true) {
      const result = await connection.query(`call checking_visits('${name}', '${maternal_surname}', '${paternal_surname}', '${email}', '${is_entry}')`);
      console.log('result', result);
      res.status(200)
      .json({
        status: "OK", 
        message: "Datos registrdos con exito",
      });
    } else if (name || !maternal_surname || !paternal_surname || email || is_entry == false ){
      const result = await connection.query(`call checking_visits('${name}','${email}', '${is_entry}')`);
      console.log('result', result);
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
    res.status(500).json(error.message);
  }
};

const consultingStudents = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("select * from consultingStudents");
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

const listSerice = async(req,res)=>{
  try{
    //const connection = await getConnection();
    //const result = await connection.query("select * from service");
    console.log(result);
    res.json(result);
  } catch(error){
    res.status(500);
    res.send(error.message);
  }
}

const listCarrer = async(req,res)=>{
  try{
    const connection = await getConnection();
    const result = await connection.query("select * from career");
    console.log(result);
    res.json(result);
  } catch(error){
    res.status(500);
    res.send(error.message);
  }
}

const listSex = async(req,res)=>{
  try{
    //const connection = await getConnection();
    //const result = await connection.query("select * from sex");
    console.log(result);
    res.json(result);
  } catch(error){
    res.status(500);
    res.send(error.message);
  }
}


export const methods = {
  getAllUsers,
  checkingUser,
  registerUsers,
  registerVisits,
  consultingStudents,
  listSerice,
  listCarrer,
  listSex
};
// crear controlador , crear otra ruta sandri.routes.js
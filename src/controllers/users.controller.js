import bcrypt from "bcryptjs";
import { getConnection } from "./../database/database"

const getAllUsers = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM all_users;");
    console.log(result)
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
      res.status(400)
        .json({
          error: "Bad Request.",
          message: "Ingrese la matricula del alumno",
        });
    } else {
      const result = await connection.query(`CALL checking_student(${matricula}, @matricula)`);

      res.status(200).json({
        result: {
          ...result[0]["0"]
        }
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
    const { matricula, name, lastnamef, lastnamem, adress, phone, gender, career, service, institutional_email, password, email } = req.body;
    console.log('Hola')
    if (!matricula) {
      res.status(400).json({
        error: "Bad Request.",
        message: "Ingrese sus datos completos"
      });
      // descripcion de la funcionalidad

    } else {
      // TODO cambiar esta función a la carpeta de utils
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      console.log('hash;', hash)
      
      const result = await connection.query(`call sp_studen_register('${matricula}', '${name}', '${lastnamef}', '${lastnamem}', '${adress}', '${phone}', '${gender}', '${career}', '${service}', '${email}', '${institutional_email}', '${hash}', @mensaje)`);
       console.log('result', result);
      res.status(200).json('Usuario registrado exitosamente');
    }
  } catch (error) {
    res.status(500);
    console.log('error ', error)
    res.send(error.message);
  }
};

const registerVisits = async (req, res) => {
  try {
    const { name, maternal_surname, paternal_surname, email } = req.body;
    console.log(req.body)
    if (!name || !maternal_surname || !paternal_surname || !email) {
      res.status(400)
        .json({
          error: "Bad Request.",
          message: "Ingresa la datos correctos.",
        });
    } else {
      res.status(200)
        .json({
          status: "OK",
          message: "Datos registrdos con exito",
        });
    }
  } catch (error) {
    res.status(500)
      .json(error.message);
  }
};

export const methods = {
  getAllUsers,
  checkingUser,
  registerUsers,
  registerVisits
};

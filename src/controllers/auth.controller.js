import { getConnection } from "./../database/database";
import { comparePassword } from "../utils/hash";
import { methods as accessToken } from "./../middleware/validate-token";
import { generateHash } from "../utils/hash";
import { sendPasswordResetEmail } from "../utils/email";
import { token } from "morgan";

// metodo para que el usuario pueda iniciar sesion.
// const loginUser = async (req, res) => {
//   try {
//     const connection = await getConnection();
//     const { userName, userPassword } = req.body;

//     if (!userName || !userPassword) {
//       res.status(400)
//         .json({
//           status: 400,
//           error: "Bad Request.",
//           message: "Ingrese usuario y contraseña",
//         });
//     } else {
//       const result = await connection.query(`CALL login_user('${userName}', @response);`);
//       const isSame = await comparePassword(userPassword, result[0][0].userPassword);

//       if (isSame) {
//         const token = accessToken.generateAccessToken(userName, result[0][0].userPassword)

//         res.status(200).json({
//           status: 200,
//           accessToken: token,
//           expiresIn: '1800s'
//         });
//       } else {
//         res.status(400).json({
//           status: 400,
//           message: `Verifica que tu usuario y contraseña, sean correctos.`
//         });
//       }
//     }

//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// }

// segundo metodo para el inicio de sesion para extrarer el tipo de usuario y continuar con el bloqueo de urls
const loginUser = async (req, res) => {
  try {
    const connection = await getConnection();
    const { userName, userPassword } = req.body;

    if (!userName || !userPassword) {
      res.status(400).json({
        status: 400,
        error: "Bad Request.",
        message: "Ingrese usuario y contraseña",
      });
    } else {
      const result = await connection.query(
        `CALL login_user('${userName}', @response);`
      );
      const isSame = await comparePassword(
        userPassword,
        result[0][0].userPassword
      );

      if (isSame) {
        const token = accessToken.generateAccessToken(
          userName,
          result[0][0].userPassword,
          result[0][0].userType
        ); // Agrega el tipo de usuario al token

        res.status(200).json({
          status: 200,
          accessToken: token,
          expiresIn: "1800s",
        });
      } else {
        res.status(400).json({
          status: 400,
          message: `Verifica que tu usuario y contraseña, sean correctos.`,
        });
      }
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// Metodo para que los usuarios puedan restablecer contraseña primero verifica la exitencia
// v2
const forgotPassword = async (req, res) => {
  try {
    const connection = await getConnection();
<<<<<<< HEAD
    const {matricula, institutional_email } = req.body;
  
    // Verificar si el correo y la matrícula coinciden con los registros en la base de datos
    const result = await connection.query(
      `SELECT * FROM users WHERE institutional_email = '${institutional_email}' AND matricula = '${matricula}'`
    );

    if (result.length === 0) {
      return res.status(400).json({
=======
    const { matricula, institutional_email } = req.body;
    console.log(req.body);
    if (!matricula || !institutional_email) {
      res.status(400).json({
>>>>>>> 0053fd98145600f70f0c7f23f71a7c5c6fb0a954
        status: 400,
        message: "Correo o matrícula no encontrados.",
      });
<<<<<<< HEAD
=======
    } else {
      // Verificar si el correo y la matrícula coinciden con los registros en la base de datos
      const result = await connection.query(
        `SELECT * FROM users WHERE institutional_email = '${institutional_email}' AND matricula = '${matricula}'`
      );
      if (result===0) {
        return res.status(404).json({
          status: 404,
          message: "Correo o matrícula no encontrados.",
        });
      } else {
        // Generar un token de restablecimiento de contraseña
        const token = accessToken.generateResetToken(
        );

        // Guardar el token en la base de datos asociado al usuario
        await connection.query(
          `UPDATE users SET reset_token = '${token}' WHERE matricula = '${matricula}'`
        );

        //Enviar correo electrónico al usuario con el enlace de restablecimiento de contraseña
       sendPasswordResetEmail(institutional_email, token);

        res.status(200).json({
          status: 200,
         // accessToken: token,
          message: "Correo enviado para restablecer la contraseña.",
        });
      }
>>>>>>> 0053fd98145600f70f0c7f23f71a7c5c6fb0a954
    }

    // Generar un token de restablecimiento de contraseña
    const token = accessToken.generateResetToken(
      result[0][0].institutional_email,
      result[0][0].matricula
    );

    // Guardar el token en la base de datos asociado al usuario
    await connection.query(
      `UPDATE users SET reset_token = '${token}' WHERE institutional_email = '${institutional_email}'`
    );

    // Enviar correo electrónico al usuario con el enlace de restablecimiento de contraseña
    sendPasswordResetEmail(institutional_email, token);

    res.status(200).json({
      status: 200, 
      accessToken: token, 
      message: "Correo enviado para restablecer la contraseña.",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
// v3



// Restablece la contraseña
const changePassword = async (req, res) => {
  try {
    const connection = await getConnection();
    const { Token, newPassword, confirmNewPassword } = req.body;

    // Verificar que las contraseñas coincidan
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        status: 400,
        message: "Las contraseñas no coinciden.",
      });
    }

    // Verificar si el token de restablecimiento es válido
    const result = await connection.query(
      `SELECT * FROM users WHERE reset_token = '${Token}'`
    );

    if (result.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Token de restablecimiento inválido.",
      });
    }

    // Generar el hash de la nueva contraseña
    const hashedPassword = generateHash(newPassword);

    // Actualizar la contraseña en la base de datos
    await connection.query(
      `UPDATE users SET password = '${hashedPassword}', reset_token = NULL WHERE reset_token = '${Token}'`
    );

    res.status(200).json({
      status: 200,
      message: "Contraseña restablecida exitosamente.",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// exporta los metodos creados.
export const methods = {
  loginUser,
  changePassword,
  forgotPassword
};

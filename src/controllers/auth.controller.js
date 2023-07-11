import { getConnection } from "./../database/database";
import { comparePassword } from "../utils/hash";
import { methods as accessToken } from "./../middleware/validate-token";
import { generateHash } from "../utils/hash";
import { sendPasswordResetEmail } from "../utils/email";

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
const resetPassword = async (req, res) => {
  try {
    const connection = await getConnection();
    const { email, matricula } = req.body;

    // Verificar si el correo y la matrícula coinciden con los registros en la base de datos
    const result = await connection.query(
      `SELECT * FROM users WHERE email = '${email}' AND matricula = '${matricula}'`
    );

    if (result.length === 0) {
      return res.status(400).json({
        status: 400,
        message: "Correo o matrícula no encontrados.",
      });
    }

    // Generar un token de restablecimiento de contraseña
    const resetToken = generateResetToken();

    // Guardar el token en la base de datos asociado al usuario
    await connection.query(
      `UPDATE users SET reset_token = '${resetToken}' WHERE email = '${email}'`
    );

    // Enviar correo electrónico al usuario con el enlace de restablecimiento de contraseña
    sendPasswordResetEmail(email, resetToken);

    res.status(200).json({
      status: 200, 
      message: "Correo enviado para restablecer la contraseña.",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// v2
const forgotPassword = async (req, res) => {
  try {
    const connection = await getConnection();
    const { institutional_email, matricula } = req.body;
    if (!institutional_email, !matricula) {
      res.status(400).json({
        status: 400,
        error: "Bad Request.",
        message: "Ingrese datos completos",
      });
    } else {
      // Verificar si el correo y la matrícula coinciden con los registros en la base de datos
      const result = await connection.query(
        `SELECT * FROM users WHERE institutional_email = '${institutional_email}' AND matricula = '${matricula}'`
      );
      if (result.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "Correo o matrícula no encontrados.",
        });
      } else {
        // Generar un token de restablecimiento de contraseña
        const Token = resetToken.generateResetToken(
          result[0][0].userMail,
          result[0][0].userMatricula
        );

        // Guardar el token en la base de datos asociado al usuario
        await connection.query(
          `UPDATE users SET reset_token = '${Token}' WHERE matricula = '${matricula}'`
        );

        // Enviar correo electrónico al usuario con el enlace de restablecimiento de contraseña
        sendPasswordResetEmail(institutional_email, Token);

        res.status(200).json({
          status: 200,
          resetToken: Token,
          message: "Correo enviado para restablecer la contraseña.",
        });
      }
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// Restablece la contraseña
const changePassword = async (req, res) => {
  try {
    const connection = await getConnection();
    const { resetToken, newPassword, confirmNewPassword } = req.body;

    // Verificar que las contraseñas coincidan
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        status: 400,
        message: "Las contraseñas no coinciden.",
      });
    }

    // Verificar si el token de restablecimiento es válido
    const result = await connection.query(
      `SELECT * FROM users WHERE reset_token = '${resetToken}'`
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
      `UPDATE users SET password = '${hashedPassword}', reset_token = NULL WHERE reset_token = '${resetToken}'`
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
  resetPassword,
  changePassword,
  forgotPassword
};

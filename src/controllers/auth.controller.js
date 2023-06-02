import { getConnection } from "./../database/database"
import { comparePassword } from "../utils/hash";
import { methods as accessToken } from "./../middleware/validate-token";

const loginUser = async (req, res) => {
  try {
    const connection = await getConnection();
    const { userName, userPassword } = req.body;
    
    if (!userName || !userPassword) {
      res.status(400)
        .json({
          status: 400,
          error: "Bad Request.",
          message: "Ingrese usuario y contraseña",
        });
    } else {
      const result = await connection.query(`CALL login_user('${userName}', @response);`);
      const isSame = await comparePassword(userPassword, result[0][0].userPassword);

      if (isSame) {
        const token = accessToken.generateAccessToken(userName, result[0][0].userPassword)
        
        res.status(200).json({
          status: 200,
          accessToken: token,
          expiresIn: '1800s'
        });
      } else {
        res.status(400).json({
          status: 400,
          message: `Verifica que tu usuario y contraseña, sean correctos.`
        });
      }
    }

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

export const methods = {
  loginUser
}

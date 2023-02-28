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
      const result = await connection.query(`CALL checking_student(${matricula}, @matricula, @nameStudent, @firstName, @secondName)`);

      res.status(200).json({
        result: {
          ...result
        }
      });
    }

  } catch (error) {
    console.log('error => ', error)
    res.status(500)
      .json(error.message);
  }
};

const registerUsers = async (req, res) => {
  try {
    const connection = await getConnection();
    console.log(req)
    // const result = await connection.query("CALL user_registration(?,?,?,?,?,?,?,?,?,?,?,)");
    // console.log(result)
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getAllUsers,
  checkingUser,
  registerUsers
};

import { getConnection } from "./../database/database"

const getAllUsers = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("select * from users;");
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
  
    if (!matricula) res.status(400).json({message: "Bad Request. No se esta recibiendo la matricula del alumno"});

    const result = await connection.query(`CALL checking_student(${matricula}, @matricula, @nameStudent, @firstName, @secondName)`);
    
    console.log('result => ', result[5][0]);
    res.json({
      status: 200,
      result: {
        ...result[5][0]
      }
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const registerUsers = async (req, res) => {
  try {
    const connection = await getConnection();
    console.log(req)
    // const result = await connection.query("CALL user_registration(?,?,?,?,?,?,?,?,?,?,?,)");
    console.log(result)
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

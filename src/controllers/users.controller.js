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
  registerUsers
};

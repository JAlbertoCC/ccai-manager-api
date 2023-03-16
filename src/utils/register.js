import bcrypt from "bcryptjs";




const testUser = async (req, res) => {
  try {
    console.log('req => ', req)
    res.json('Hola')
  } catch (error) {
    console.log(error)
  }
};

// Endpoint para registrar un usuario
const registerUsers = async (req, res) => {
  try {
    console.log('req.body;', req.body.matricula)
    const { matricula, name, lastnamef, lastnamem, adress, phone, gender, career, service, mail, password } = req.body;
    
    if (!matricula) {
      res.status(400).json({
        error: "Bad Request.",
        message: "Ingrese sus datos completos"
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      // const result = await connection.query(`CALL add_users('${matricula}', '${name}', '${lastnamef}', '${lastnamem}', '${adress}', '${phone}', '${gender}', '${career}', '${service}', '${mail}', '${hash}')`);
      // console.log(req);
      res.status(200).json('Usuario registrado exitosamente');
    }
  } catch (error) {
    res.status(500);
    console.log('error ', error)
    res.send(error.message);
  }
};

export { getAllUsers, registerUsers, testUser };

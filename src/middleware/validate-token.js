const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.header('auth-token');
    
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log('verified: ', verified);
//    req.user = verified
    req.user = {
      name: verified.name,
      id: verified.id,
      userType: verified.userType // Agrega el tipo de usuario al objeto `req.user`
    };
    next();
  } catch (error) {
    res.status(400).json({error: 'token no es válido'})
    return error.message;
  }
}

const generateAccessToken = (userName, userPasswors) => {
  try {
    // create token
    const token = jwt.sign({
        name: userName,
        id: userPasswors
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '1800s'
    });

    return token;
  } catch (error) {
    return error.message;
  }
}

<<<<<<< HEAD
const generateResetToken = ( matricula,institutional_email) => {
  try {
    // create token
    const token = jwt.forgot({
        Matricula: matricula,
        Institutional_email: institutional_email
=======

const generateResetToken = ( matricula, institutional_email) => {
  try {
    // create token
    const token = jwt.forgot({
        matricula2: matricula,
        institutional_email2: institutional_email
>>>>>>> 0053fd98145600f70f0c7f23f71a7c5c6fb0a954
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '1800s'
    });

    return token;
  } catch (error) {
    return error.message;
  }
}

export const methods = {
  verifyToken,
  generateResetToken,
  generateAccessToken,
};

const jwt = require('jsonwebtoken');

const verifyToken = (req) => {
  try {
    const token = req.header('auth-token');
    
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log('verified: ', verified);
    req.user = verified
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

export const methods = {
  verifyToken,
  generateAccessToken
};

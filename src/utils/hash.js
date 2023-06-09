import bcrypt from "bcryptjs";

const generateHash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword)
}

export {
  generateHash,
  comparePassword
};

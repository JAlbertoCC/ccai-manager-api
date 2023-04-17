import bcrypt from "bcryptjs";

const generateHash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

const comparePassword = async (password) => {
  return await bcrypt.compare(password, hash)
}

export {
  generateHash,
  comparePassword
};

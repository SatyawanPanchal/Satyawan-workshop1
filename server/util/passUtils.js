import bcrypt from "bcryptjs";
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePassword = async (password_User, password_Database) => {
  const isPasswordMatched = await bcrypt.compare(
    password_User,
    password_Database
  );
  return isPasswordMatched;
};

export { hashPassword, comparePassword };

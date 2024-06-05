import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js"
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  //Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(hashedPassword);
  //create a new user and save to database
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  console.log(newUser);
};
export const login = (req, res) => {};
export const logout = (req, res) => {};

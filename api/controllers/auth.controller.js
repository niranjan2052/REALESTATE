import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
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
    res.status(200).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to create user" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //Check if the user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) return res.status(401).json({ message: "Invalid Credential" });
    //Check if the password is correct

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials!" });
    //Generate cookie toekn and send to the user

    // res.setHeader("Set-Cookie", "test=" + "myValue").json("Success");
    //jsonwebtoken
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
        // secure: true,//only allows secure connection ie.https
      })
      .status(200)
      .json({ message: "Login Successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Login!" });
  }
};
export const logout = async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successfully" });
};

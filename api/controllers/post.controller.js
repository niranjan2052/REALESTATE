import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

class postController {
  index = async (req, res) => {
    try {
     console.log("Works");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to Get Posts" });
    }
  };
  show = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to Get User" });
    }
  };
  update = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { password: pwd, avatar, ...inputs } = req.body;
    if (id !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    let updatedPassword = null;
    try {
      if (pwd) {
        updatedPassword = await bcrypt.hash(pwd, 10);
      }
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          ...inputs,
          ...(updatedPassword && { password: updatedPassword }),
          ...(avatar && { avatar }),
        },
      });
      const { password, ...output } = updatedUser;
      res.status(200).json(output);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to Update User" });
    }
  };
  destory = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    if (id !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    try {
      await prisma.user.delete({
        where: { id },
      });
      res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to Delete User" });
    }
  };
}

export default new postController();

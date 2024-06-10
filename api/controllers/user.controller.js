import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

class userController {
  index = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to Get Users" });
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

  savePost = async (req, res) => {
    const postId = req.body.postId;
    const tokenUserId = req.userId;

    try {
      const savedPost = await prisma.savedPost.findUnique({
        where: {
          userId_postId: {
            userId: tokenUserId,
            postId,
          },
        },
      });
      if (savedPost) {
        await prisma.savedPost.delete({
          where: {
            id: savedPost.id,
          },
        });
        res
          .status(200)
          .json({ message: "Post removed from saved list successfully!" });
      } else {
        await prisma.savedPost.create({
          data: {
            userId: tokenUserId,
            postId,
          },
        });
        res.status(200).json({ message: "Post Added to the Saved List" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to handle post" });
    }
  };


  profilePosts = async (req, res) => {
    const tokenUserId = req.userId;
    try {
      const userPosts = await prisma.post.findMany({
        where: {
          userId: tokenUserId,
        },
      });
      const saved = await prisma.savedPost.findMany({
        where: { userId: tokenUserId },
        include: {
          post: true,
        },
      });
      const savedPosts = saved.map((item) => item.post);
      res.status(200).json({ userPosts, savedPosts });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get profilePosts" });
    }
  };
}

export default new userController();

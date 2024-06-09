import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

class postController {
  index = async (req, res) => {
    try {
      const posts = await prisma.post.findMany();
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to Get Posts" });
    }
  };
  show = async (req, res) => {
    const id = req.params.id;
    try {
      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          postDetail: true,
          user: true,
        },
      });
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to Get User" });
    }
  };
  store = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;
    try {
      const newPost = await prisma.post.create({
        data: {
          ...body.postData,
          userId: tokenUserId,
          postDetail: {
            create: body.postDetail,
          },
        },
      });
      res.status(200).send(newPost);
    } catch (error) {}
  };
  update = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to Update Post" });
    }
  };
  destory = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    try {
      const post = await prisma.post.findUnique({
        where: { id },
      });
      if (post.userId !== tokenUserId) {
        return res.status(403).send({ message: "Not Authorized" });
      }
      await prisma.post.delete({
        where: { id },
      });
      res.status(200).json({ message: "Post Deleted Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to delete Post" });
    }
  };
}

export default new postController();

import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class postController {
  index = async (req, res) => {
    const query = req.query;

    try {
      const posts = await prisma.post.findMany({
        where: {
          city: { contains: query.city || undefined, mode: "insensitive" },
          type: query.type || undefined,
          property: query.property || undefined,
          bedroom: parseInt(query.bedroom) || undefined,
          price: {
            gte: parseInt(query.minPrice) || 0,
            lte: parseInt(query.maxPrice) || 10000000,
          },
        },
      });
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
          user: {
            select: {
              username: true,
              avatar: true,
            },
          },
        },
      });

      const token = req.cookies?.token;

      if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
          if (!err) {
            const saved = await prisma.savedPost.findUnique({
              where: {
                userId_postId: {
                  postId: id,
                  userId: payload.id,
                },
              },
            });
            res.status(200).json({ ...post, isSaved: saved ? true : false });
          }
        });
      } else {
        res.status(200).json({ ...post, isSaved: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to Get Post" });
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

import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import postController from "../controllers/post.controller.js";

const router = express.Router();

router
  .route("/")
  .get(postController.index)
  .post(verifyToken, postController.store);

router
  .route("/:id")
  .get(postController.show)
  .patch(verifyToken, postController.update)
  .put(verifyToken, postController.update)
  .delete(verifyToken, postController.destory);

export default router;

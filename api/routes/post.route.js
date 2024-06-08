import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import postController from "../controllers/post.controller.js";

const router = express.Router();

router.route("/").get(verifyToken, postController.index);

router
  .route("/:id")
  .get(verifyToken, postController.show)
  .post(verifyToken, postController.update)
  .put(verifyToken, postController.update)
  .delete(verifyToken, postController.destory);

export default router;

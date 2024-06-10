import express from "express";
import userController from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/").get(userController.index);

router
  .route("/:id")
  // .get(verifyToken, userController.show)
  .patch(verifyToken, userController.update)
  .put(verifyToken, userController.update)
  .delete(verifyToken, userController.destory);

router.post("/save", verifyToken, userController.savePost);
router.get("/profilePosts", verifyToken, userController.profilePosts);

export default router;

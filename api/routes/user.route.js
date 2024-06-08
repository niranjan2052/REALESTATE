import express from "express";
import userController from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/").get(userController.index);

router
  .route("/:id")
  .get(verifyToken, userController.show)
  .post(verifyToken, userController.update)
  .put(verifyToken, userController.update)
  .delete(verifyToken, userController.destory);

export default router;

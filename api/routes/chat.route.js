import express from "express";
import chatController from "../controllers/chat.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router
  .route("/")
  .get(verifyToken, chatController.index)
  .post(verifyToken, chatController.store);

router.route("/:id").get(verifyToken, chatController.show);

router.put("/read/:id", verifyToken, chatController.readChat);

export default router;

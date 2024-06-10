import express from "express";
import messageController from "../controllers/message.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/:chatId").post(verifyToken,messageController.store);
export default router;

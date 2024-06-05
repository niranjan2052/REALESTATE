import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import 'dotenv/config'
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded());

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.listen("8800", () => {
  console.log("Server is running");
});

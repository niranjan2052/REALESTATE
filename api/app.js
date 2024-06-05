import express, { urlencoded } from "express";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
const app = express();

app.use(express.json());
app.use(urlencoded());

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.listen("8800", () => {
  console.log("Server is running");
});

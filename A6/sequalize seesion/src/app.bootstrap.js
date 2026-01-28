//here we will set up the application bootstrap to start our application
import { PORT } from "../config/config.service.js";
import { authenticateDB } from "./DB/database.connection.js";
import { UserModel, PostModel, CommentModel } from "./DB/models/index.js";
import {
  authRouter,
  userRouter,
  postRouter,
  commentRouter,
} from "./module/index.js";
import express from "express";
async function bootstrapApp() {
  const app = express();
  //DB connection can be setup here
  //test the connection
  await authenticateDB();
  //sync all models to be sure the tables are created in the database
  await UserModel.sync({ force: false });
  await PostModel.sync({ force: false });
  await CommentModel.sync({ force: false });
  //global aplplication middlewares can be set here
  app.use(express.json());
  //route definitions can be set here
  app.get("/", (req, res) => {
    return res
      .status(200)
      .json({ message: "welcome to Route C45 node js structure" });
  });
  app.use("/auth", authRouter);
  app.use("/users", userRouter); // Changed from "/user" to "/users" to match requirements
  app.use("/posts", postRouter);
  app.use("/comments", commentRouter);
  app.use((err, req, res, next) => {
    return res.json({
      message: err.message || "something went wrong",
      stack: err.stack,
    });
  });
  app.use("{/*dummy}", (req, res) => {
    return res.status(404).json({ message: "invalide route" });
  });
  app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
}
export default bootstrapApp;

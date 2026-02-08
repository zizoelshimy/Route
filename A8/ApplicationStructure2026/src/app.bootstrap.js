import { NODE_ENV, port } from "../config/config.service.js";
import { authRouter, userRouter, noteRouter } from "./modules/index.js";
import { authenticateDB } from "./DB/connection.db.js";
import { productRouter } from "./modules/index.js";
import express from "express";
import { globalErrorHandling } from "./common/utils/index.js";

async function bootstrap() {
  const app = express();
  //convert buffer data
  app.use(express.json());
  //DB
  await authenticateDB();
  //application routing
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/users", authRouter);
  app.use("/users", userRouter);
  app.use("/notes", noteRouter);
  app.use("/product", productRouter);

  //invalid routing
  app.use("{/*dummy}", (req, res) => {
    return res.status(404).json({ message: "Invalid application routing" });
  });

  //error-handling
  app.use(globalErrorHandling);

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}
export default bootstrap;

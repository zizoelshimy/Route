import { Router } from "express";
import { signup, login } from "./auth.service.js";
import { succesResponse } from "../../common/utils/index.js";

const router = Router();

router.post("/signup", async (req, res, next) => {
  try {
    const result = await signup(req.body);
    return succesResponse({
      res,
      status: 201,
      message: result.message,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await login(req.body);
    return succesResponse({
      res,
      status: 200,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

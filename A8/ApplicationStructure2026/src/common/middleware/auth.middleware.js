import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/config.service.js";

export const authenticate = (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.replace("Bearer ", "") || req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "Authentication token required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

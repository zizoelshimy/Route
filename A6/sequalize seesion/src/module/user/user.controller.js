import { Router } from "express";
import {
  profile,
  updateProfile,
  createUser,
  upsertUser,
  findUserByEmail,
  getUserById,
} from "./user.service.js";
const router = Router();

// API 1: POST /users/signup - Create new user (0.5 Grade)
router.post("/signup", async (req, res, next) => {
  try {
    const result = await createUser(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    return res.status(201).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

// API 2: PUT /users/:id - Create or update with skip validation (0.5 Grade)
router.put("/:id", async (req, res, next) => {
  try {
    const result = await upsertUser(req.params.id, req.body);
    return res.status(200).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

// API 3: GET /users/by-email - Find user by email
router.get("/by-email", async (req, res, next) => {
  try {
    const result = await findUserByEmail(req.query.email);
    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }
    return res.status(200).json({ user: result.user });
  } catch (error) {
    next(error);
  }
});

// API 4: GET /user/:id - Get user by PK excluding role
router.get("/:id", async (req, res, next) => {
  try {
    const result = await getUserById(req.params.id);
    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }
    return res.status(200).json(result.user);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  const result = await profile(req.query.id);
  return res.status(200).json({ message: "profile", result });
});
router.patch("/:userId", async (req, res, next) => {
  const result = await updateProfile(req.params.userId, req.body);
  return res.status(200).json({ message: "profile", result });
});
router.get("/profile", async (req, res) => {
  const profileData = await profile(req.query.email);
  //logic for fetching user profile can be implemented here
  return res
    .status(200)
    .json({ message: "user profile data", data: profileData });
});
export default router;

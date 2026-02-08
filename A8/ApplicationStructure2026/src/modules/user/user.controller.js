import { Router } from "express";
import { getProfile, updateProfile, deleteProfile } from "./user.service.js";
import { authenticate } from "../../common/middleware/auth.middleware.js";
import { succesResponse } from "../../common/utils/index.js";

const router = Router();

// Get logged-in user data
router.get("/", authenticate, async (req, res, next) => {
  try {
    const result = await getProfile(req.userId);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return succesResponse({
      res,
      status: 200,
      message: "Profile",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// Update logged-in user (except password)
router.patch("/", authenticate, async (req, res, next) => {
  try {
    const result = await updateProfile(req.userId, req.body);
    return res.status(200).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

// Delete logged-in user
router.delete("/", authenticate, async (req, res, next) => {
  try {
    const result = await deleteProfile(req.userId);
    return res.status(200).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

export default router;

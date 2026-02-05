import { Router } from "express";
import {
  profile,
  allUsers,
  updateProfile,
  deleteProfile,
} from "./user.service.js";
const router = Router();

router.get("/:userId", async (req, res, next) => {
  const result = await profile(req.params.userId);
  return res.status(200).json({ message: "Profile", result });
});
router.get("/", async (req, res, next) => {
  const result = await allUsers();
  return res.status(200).json({ message: "All Users", result });
});
router.patch("/:userId", async (req, res, next) => {
  const result = await updateProfile(req.params.userId, req.body);
  return res.status(200).json({ message: "Profile Updated", result });
});
router.delete("/:userId", async (req, res, next) => {
  const result = await deleteProfile(req.params.userId);
  return res.status(200).json({ message: "Profile Deleted", result });
});
export default router;

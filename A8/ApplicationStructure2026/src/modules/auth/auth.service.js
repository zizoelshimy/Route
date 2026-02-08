import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { ErrorException } from "../../common/utils/index.js";
import { UserModel } from "../../DB/model/index.js";
import {
  SALT_ROUND,
  JWT_SECRET,
  ENCRYPTION_KEY,
} from "../../../config/config.service.js";

// Helper function to encrypt phone number
const encryptPhone = (phone) => {
  const algorithm = "aes-256-cbc";
  const key = crypto.scryptSync(ENCRYPTION_KEY, "salt", 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(phone, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

export const signup = async (inputs) => {
  const { name, email, Password, Phone, age } = inputs;

  // Check if user already exists
  const checkUserExist = await UserModel.findOne({ email });
  if (checkUserExist) {
    throw new Error("Email already exists", { cause: { status: 409 } });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(Password, SALT_ROUND);

  // Encrypt phone
  const encryptedPhone = encryptPhone(Phone);

  // Create new user
  const newUser = await UserModel.create({
    name,
    email,
    Password: hashedPassword,
    Phone: encryptedPhone,
    age,
  });

  return { message: "User added successfully" };
};

export const login = async (inputs) => {
  const { email, Password } = inputs;

  // Find user by email
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password", { cause: { status: 401 } });
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(Password, user.Password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password", { cause: { status: 401 } });
  }

  // Generate JWT token with 1 hour expiration
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

  return { token };
};

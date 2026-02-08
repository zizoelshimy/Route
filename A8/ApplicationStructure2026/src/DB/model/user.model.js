import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    Password: {
      type: String,
      required: [true, "Password is required"],
    },
    Phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    age: {
      type: Number,
      min: [18, "Age must be at least 18"],
      max: [60, "Age must be at most 60"],
    },
  },
  {
    collection: "users",
    timestamps: true,
    strictQuery: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
//this is to avoid model overwrite issue in watch mode if the model is already compiled else compile a new model
export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);

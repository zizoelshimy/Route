import { UserModel } from "../../DB/model/index.js";

export const getProfile = async (id) => {
  const user = await UserModel.findById(id).select("-Password");
  return user;
};

export const updateProfile = async (id, inputs) => {
  const { name, email, Phone, age } = inputs;

  // Check if trying to update password (not allowed)
  if (inputs.Password) {
    throw new Error("Password cannot be updated through this endpoint", {
      cause: { status: 400 },
    });
  }

  // If updating email, check if new email already exists
  if (email) {
    const existingUser = await UserModel.findOne({ email, _id: { $ne: id } });
    if (existingUser) {
      throw new Error("Email already exists", { cause: { status: 409 } });
    }
  }

  // Check if user exists
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error("User not found", { cause: { status: 404 } });
  }

  // Update user
  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (Phone) updateData.Phone = Phone;
  if (age) updateData.age = age;

  await UserModel.updateOne(
    { _id: id },
    { $set: updateData },
    { runValidators: true },
  );

  return { message: "User updated" };
};

export const deleteProfile = async (id) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error("User not found", { cause: { status: 404 } });
  }

  await UserModel.deleteOne({ _id: id });
  return { message: "User deleted" };
};

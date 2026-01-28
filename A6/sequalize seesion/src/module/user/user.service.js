import { Op } from "sequelize";
import { UserModel } from "../../DB/models/user.model.js";

// API 1: Create a new user (using build and save)
export const createUser = async (input) => {
  try {
    // Check if email already exists
    const existingUser = await UserModel.findOne({
      where: { email: input.email },
    });
    if (existingUser) {
      return { success: false, message: "Email already exists." };
    }

    const user = UserModel.build(input);
    await user.save();

    return { success: true, message: "User added successfully." };
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return {
        success: false,
        message: error.errors.map((e) => e.message).join(", "),
      };
    }
    throw error;
  }
};

// API 2: Create or update based on PK and use skip validation option
export const upsertUser = async (id, input) => {
  try {
    // Using upsert with id - creates if not exists, updates if exists
    // Skip validation by setting validate: false
    const [user, created] = await UserModel.upsert(
      { id: parseInt(id), ...input },
      { validate: false },
    );

    return { success: true, message: "User created or updated successfully" };
  } catch (error) {
    throw error;
  }
};

// API 3: Find user by email address
export const findUserByEmail = async (email) => {
  const user = await UserModel.findOne({ where: { email } });
  if (!user) {
    return { success: false, message: "no user found" };
  }
  return { success: true, user };
};

// API 4: Get user by PK excluding role field
export const getUserById = async (id) => {
  const user = await UserModel.findByPk(id, {
    attributes: { exclude: ["role"] }, // Exclude role field from response
  });
  if (!user) {
    return { success: false, message: "no user found" };
  }
  return { success: true, user };
};

export const profile = async ({ id, page = 1, size = 2 }) => {
  // const user = await UserModel.findByPk(id,
  // { attributes: ["password","email","gender"] });
  //find first record matching the query the different from findbypk that it use where clause and findbypk use primary key only
  //const user = await UserModel.findOne({
  //where: {
  // id:{[Op.gt]:1}
  //}
  //})/
  // const user = await UserModel.findAll({
  where: {
  }
  //});
  page = parseInt(page);
  size = parseInt(size);
  const offset = (page - 1) * size;
  //pagination concept
  //findAndCountAll is used to get total count along with paginated data
  const user = await UserModel.findAndCountAll({
    limit: size,
    offset: offset,
    where: {
      gender: "female",
    },
  });
  return {
    count: user.count,
    rows: user.rows,
    pages: Math.ceil(user.count / size),
    pageSize: size,
  };
};
export const updateProfile = async (userId, input) => {
  const user = await UserModel.update(input, {
    where: { id: userId },
    returning: true, //to get the updated record(s) back
  });
  if (!user[0]) {
    throw new Error("invalid user id");
  }
  return user[1][0];
};

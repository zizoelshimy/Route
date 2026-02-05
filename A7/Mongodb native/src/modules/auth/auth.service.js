import { userCollection } from "../../DB/model/user.model.js";

export const signup = async (inputs) => {
    const { email,fullName,password } = inputs;
    const checkDuplicateAccount = await userCollection.findOne({ email });
    if (checkDuplicateAccount) {
        throw new Error("Email already exists",{cause:409});
    }
  // Insert user into MongoDB
  const user = await userCollection.insertOne({email,fullName,password});
  return user;
};
export const login = async (inputs) => {
    const { email,password } = inputs;
    const user = await userCollection.findOne({ email,password });
    if (!user) {
        throw new Error("Invalid credentials",{cause:404});
    }
  return user;
};

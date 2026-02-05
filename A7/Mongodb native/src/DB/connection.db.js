import { MongoClient } from "mongodb";
import { DB_URI,DB_NAME } from "../../config/config.service.js";
const client = new MongoClient(DB_URI);
export const db= client.db(DB_NAME)
export const authenticateDB = async () => {
  try {
    await client.connect();
    console.log("DB connected");
  } catch (err) {
    console.log("DB connection failed", err);
  }
};

import { DataTypes } from "sequelize";
import { sequelize } from "../database.connection.js";

// Users Model (using define) 
export const UserModel = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Please enter a valid email format" }, 
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkPasswordLength(value) {
          if (value.length <= 6) {
            throw new Error(
              "Password length must be greater than 6 characters",
            );
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    timestamps: true, 
    hooks: {
      beforeCreate: (user) => {
        // beforeCreate hook - 0.5 Grade
        if (user.name.length <= 2) {
          throw new Error("Name length must be greater than 2 characters");
        }
      },
    },
  },
);

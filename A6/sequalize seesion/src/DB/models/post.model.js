import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database.connection.js";
export class PostModel extends Model {}

PostModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", 
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "post",
    timestamps: true, 
    paranoid: true, 
  },
);

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database.connection.js";

export class CommentModel extends Model {}

CommentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posts", 
        key: "id",
      },
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
    modelName: "comment",
    timestamps: true, 
  },
);

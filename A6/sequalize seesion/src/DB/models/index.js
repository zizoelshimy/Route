export * from "./user.model.js";
export * from "./post.model.js";
export * from "./comment.model.js";

// Import models to set up associations
import { UserModel } from "./user.model.js";
import { PostModel } from "./post.model.js";
import { CommentModel } from "./comment.model.js";

// Define associations
// User has many Posts
UserModel.hasMany(PostModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
PostModel.belongsTo(UserModel, {
  foreignKey: "userId",
});

// User has many Comments
UserModel.hasMany(CommentModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
CommentModel.belongsTo(UserModel, {
  foreignKey: "userId",
});

// Post has many Comments
PostModel.hasMany(CommentModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});
CommentModel.belongsTo(PostModel, {
  foreignKey: "postId",
});

import { PostModel, UserModel, CommentModel } from "../../DB/models/index.js";
import { sequelize } from "../../DB/database.connection.js";

// API 1: Create new post using new instance and save
export const createPost = async (input) => {
  try {
    // Using new instance and save
    const post = new PostModel(input);
    await post.save();

    return { success: true, message: "Post created successfully." };
  } catch (error) {
    throw error;
  }
};

// API 2: Delete post by id (only owner can delete)
export const deletePost = async (postId, userId) => {
  try {
    // Find the post first
    const post = await PostModel.findByPk(postId);

    if (!post) {
      return { success: false, message: "Post not found." };
    }

    // Check if the user is the owner of the post
    if (post.userId !== parseInt(userId)) {
      return {
        success: false,
        message: "You are not authorized to delete this post.",
      };
    }

    // Delete the post (soft delete because of paranoid: true)
    await post.destroy();

    return { success: true, message: "Post deleted." };
  } catch (error) {
    throw error;
  }
};

// API 3: Get all posts with user details and comments
export const getAllPostsWithDetails = async () => {
  const posts = await PostModel.findAll({
    attributes: ["id", "title"], // Only show id and title for post
    include: [
      {
        model: UserModel,
        attributes: ["id", "name"], // Only show id and name for user
      },
      {
        model: CommentModel,
        attributes: ["id", "content"], // Only show id and content for comments
      },
    ],
  });
  return posts;
};

// API 4: Get all posts with comment count
export const getPostsWithCommentCount = async () => {
  const posts = await PostModel.findAll({
    attributes: [
      "id",
      "title",
      [sequelize.fn("COUNT", sequelize.col("comments.id")), "commentCount"],
    ],
    include: [
      {
        model: CommentModel,
        attributes: [], // Don't include comment data, just count
      },
    ],
    group: ["post.id"], // Group by post id to count comments per post
  });
  return posts;
};

import { CommentModel, UserModel, PostModel } from "../../DB/models/index.js";
import { Op } from "sequelize";

// API 1: Create bulk comments
export const createBulkComments = async (comments) => {
  try {
    // Using bulkCreate to insert multiple comments at once
    await CommentModel.bulkCreate(comments);

    return { success: true, message: "comments created." };
  } catch (error) {
    throw error;
  }
};

// API 2: Update comment content by owner
export const updateComment = async (commentId, userId, content) => {
  try {
    // Find the comment first
    const comment = await CommentModel.findByPk(commentId);

    if (!comment) {
      return { success: false, message: "comment not found." };
    }

    // Check if the user is the owner of the comment
    if (comment.userId !== parseInt(userId)) {
      return {
        success: false,
        message: "You are not authorized to update this comment.",
      };
    }

    // Update the comment content
    comment.content = content;
    await comment.save();

    return { success: true, message: "Comment updated." };
  } catch (error) {
    throw error;
  }
};

// API 3: Find or create comment
export const findOrCreateComment = async (postId, userId, content) => {
  try {
    // Using findOrCreate - finds the comment or creates it if it doesn't exist
    const [comment, created] = await CommentModel.findOrCreate({
      where: {
        postId: parseInt(postId),
        userId: parseInt(userId),
        content: content,
      },
      defaults: {
        postId: parseInt(postId),
        userId: parseInt(userId),
        content: content,
      },
    });

    return { comment, created };
  } catch (error) {
    throw error;
  }
};

// API 4: Search comments by word with count
export const searchComments = async (word) => {
  try {
    // Using findAndCountAll to get both count and comments
    const result = await CommentModel.findAndCountAll({
      where: {
        content: {
          [Op.like]: `%${word}%`, // Search for word in content
        },
      },
    });

    if (result.count === 0) {
      return { success: false, message: "no comments found." };
    }

    return { success: true, count: result.count, comments: result.rows };
  } catch (error) {
    throw error;
  }
};

// API 5: Get 3 most recent comments for a specific post
export const getNewestComments = async (postId) => {
  try {
    const comments = await CommentModel.findAll({
      where: {
        postId: parseInt(postId),
      },
      attributes: ["id", "content", "createdAt"],
      order: [["createdAt", "DESC"]], // Order by creation date descending (newest first)
      limit: 3, // Get only 3 comments
    });

    return comments;
  } catch (error) {
    throw error;
  }
};

// API 6: Get specific comment by PK with user and post information
export const getCommentWithDetails = async (commentId) => {
  try {
    const comment = await CommentModel.findByPk(commentId, {
      attributes: ["id", "content"],
      include: [
        {
          model: UserModel,
          attributes: ["id", "name", "email"],
        },
        {
          model: PostModel,
          attributes: ["id", "title", "content"],
        },
      ],
    });

    if (!comment) {
      return { success: false, message: "no comment found" };
    }

    return { success: true, comment };
  } catch (error) {
    throw error;
  }
};

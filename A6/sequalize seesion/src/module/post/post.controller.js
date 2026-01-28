import { Router } from "express";
import { createPost, deletePost, getAllPostsWithDetails, getPostsWithCommentCount } from "./post.service.js";

const router = Router();

// API 1: POST /posts - Create new post 
router.post("/", async (req, res, next) => {
  try {
    const result = await createPost(req.body);
    return res.status(201).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

// API 2: DELETE /posts/:postId - Delete post by owner 
router.delete("/:postId", async (req, res, next) => {
  try {
    const userId = req.body.userId || req.query.userId;
    
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const result = await deletePost(req.params.postId, userId);
    
    if (!result.success) {
      const statusCode = result.message === "Post not found." ? 404 : 403;
      return res.status(statusCode).json({ message: result.message });
    }
    
    return res.status(200).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

// API 3: GET /posts/details - Get all posts with user and comments details 
router.get("/details", async (req, res, next) => {
  try {
    const posts = await getAllPostsWithDetails();
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

// API 4: GET /posts/comment-count - Get posts with comment count 
router.get("/comment-count", async (req, res, next) => {
  try {
    const posts = await getPostsWithCommentCount();
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

export default router;

import { Router } from "express";
import {
  createBulkComments,
  updateComment,
  findOrCreateComment,
  searchComments,
  getNewestComments,
  getCommentWithDetails,
} from "./comment.service.js";

const router = Router();

// API 1: POST /comments - Create bulk comments
router.post("/", async (req, res, next) => {
  try {
    const comments = req.body.comments;

    if (!comments || !Array.isArray(comments)) {
      return res.status(400).json({ message: "comments array is required" });
    }

    const result = await createBulkComments(comments);
    return res.status(201).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

// API 2: PATCH /comments/:commentId - Update comment by owner
router.patch("/:commentId", async (req, res, next) => {
  try {
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res
        .status(400)
        .json({ message: "userId and content are required" });
    }

    const result = await updateComment(req.params.commentId, userId, content);

    if (!result.success) {
      const statusCode = result.message === "comment not found." ? 404 : 403;
      return res.status(statusCode).json({ message: result.message });
    }

    return res.status(200).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

// API 3: POST /comments/find-or-create - Find or create comment
router.post("/find-or-create", async (req, res, next) => {
  try {
    const { postId, userId, content } = req.body;

    if (!postId || !userId || !content) {
      return res
        .status(400)
        .json({ message: "postId, userId, and content are required" });
    }

    const result = await findOrCreateComment(postId, userId, content);
    return res
      .status(200)
      .json({ comment: result.comment, created: result.created });
  } catch (error) {
    next(error);
  }
});

// API 4: GET /comments/search - Search comments by word
router.get("/search", async (req, res, next) => {
  try {
    const word = req.query.word;

    if (!word) {
      return res
        .status(400)
        .json({ message: "word query parameter is required" });
    }

    const result = await searchComments(word);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    return res
      .status(200)
      .json({ count: result.count, comments: result.comments });
  } catch (error) {
    next(error);
  }
});

// API 5: GET /comments/newest/:postId - Get 3 most recent comments for a post
router.get("/newest/:postId", async (req, res, next) => {
  try {
    const comments = await getNewestComments(req.params.postId);
    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

// API 6: GET /comments/details/:id - Get comment by PK with user and post info
router.get("/details/:id", async (req, res, next) => {
  try {
    const result = await getCommentWithDetails(req.params.id);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    return res.status(200).json(result.comment);
  } catch (error) {
    next(error);
  }
});

export default router;

import { Router } from "express";
import {
  createNote,
  updateNote,
  replaceNote,
  updateAllNotes,
  deleteNote,
  getPaginatedNotes,
  getNoteById,
  getNoteByContent,
  getNotesWithUser,
  getNotesAggregateWithSearch,
  deleteAllNotes,
} from "./note.service.js";
import { authenticate } from "../../common/middleware/auth.middleware.js";
import { succesResponse } from "../../common/utils/index.js";

const router = Router();

// Create a note
router.post("/", authenticate, async (req, res, next) => {
  try {
    const result = await createNote(req.userId, req.body);
    return res.status(201).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

// Update a note (PATCH)
router.patch("/:noteId", authenticate, async (req, res, next) => {
  try {
    const result = await updateNote(req.params.noteId, req.userId, req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Replace a note (PUT)
router.put("/replace/:noteId", authenticate, async (req, res, next) => {
  try {
    const result = await replaceNote(req.params.noteId, req.userId, req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Update all notes' titles for logged-in user
router.patch("/all", authenticate, async (req, res, next) => {
  try {
    const result = await updateAllNotes(req.userId, req.body);
    return res.status(200).json({ message: result.message });
  } catch (error) {
    next(error);
  }
});

// Delete a single note by ID
router.delete("/:noteId", authenticate, async (req, res, next) => {
  try {
    const result = await deleteNote(req.params.noteId, req.userId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Get paginated notes sorted by createdAt descending
router.get("/paginate-sort", authenticate, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const notes = await getPaginatedNotes(req.userId, page, limit);
    return res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

// Get a note by its ID (owner only)
router.get("/id/:noteId", authenticate, async (req, res, next) => {
  try {
    const note = await getNoteById(req.params.noteId, req.userId);
    return res.status(200).json(note);
  } catch (error) {
    next(error);
  }
});

// Get a note by its content
router.get("/note-by-content", authenticate, async (req, res, next) => {
  try {
    const note = await getNoteByContent(req.userId, req.query.content);
    return res.status(200).json(note);
  } catch (error) {
    next(error);
  }
});

// Get all notes with user information (select specific fields)
router.get("/note-with-user", authenticate, async (req, res, next) => {
  try {
    const notes = await getNotesWithUser(req.userId);
    return res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

// Get aggregated notes with user info and search capability
router.get("/aggregate", authenticate, async (req, res, next) => {
  try {
    const notes = await getNotesAggregateWithSearch(
      req.userId,
      req.query.title,
    );
    return res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

// Delete all notes for logged-in user
router.delete("/", authenticate, async (req, res, next) => {
  try {
    const result = await deleteAllNotes(req.userId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default router;

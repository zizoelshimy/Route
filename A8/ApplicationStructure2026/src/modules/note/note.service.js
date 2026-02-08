import { NoteModel } from "../../DB/model/index.js";
import mongoose from "mongoose";

export const createNote = async (userId, inputs) => {
  const { title, content } = inputs;

  const newNote = await NoteModel.create({
    title,
    content,
    userId,
  });

  return { message: "Note created" };
};

export const updateNote = async (noteId, userId, inputs) => {
  const { title, content } = inputs;

  // Find the note
  const note = await NoteModel.findById(noteId);

  if (!note) {
    throw new Error("Note not found", { cause: { status: 404 } });
  }

  // Check if user is the owner
  if (note.userId.toString() !== userId) {
    throw new Error("You are not the owner", { cause: { status: 403 } });
  }

  // Update the note
  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (content !== undefined) updateData.content = content;

  await NoteModel.updateOne(
    { _id: noteId },
    { $set: updateData },
    { runValidators: true },
  );

  // Get updated note
  const updatedNote = await NoteModel.findById(noteId);

  return { message: "updated", note: updatedNote };
};

export const replaceNote = async (noteId, userId, inputs) => {
  const { title, content, userId: bodyUserId } = inputs;

  // Find the note
  const note = await NoteModel.findById(noteId);

  if (!note) {
    throw new Error("Note not found", { cause: { status: 404 } });
  }

  // Check if user is the owner
  if (note.userId.toString() !== userId) {
    throw new Error("You are not the owner", { cause: { status: 403 } });
  }

  // Replace the entire document
  const replacedNote = await NoteModel.findByIdAndUpdate(
    noteId,
    {
      title,
      content,
      userId: bodyUserId || userId,
    },
    {
      new: true,
      runValidators: true,
      overwrite: true,
    },
  );

  return replacedNote;
};

export const updateAllNotes = async (userId, inputs) => {
  const { title } = inputs;

  // Update all notes belonging to the user
  const result = await NoteModel.updateMany(
    { userId },
    { $set: { title } },
    { runValidators: true },
  );

  if (result.matchedCount === 0) {
    throw new Error("No note found", { cause: { status: 404 } });
  }

  return { message: "All notes updated" };
};

export const deleteNote = async (noteId, userId) => {
  // Find the note
  const note = await NoteModel.findById(noteId);

  if (!note) {
    throw new Error("Note not found", { cause: { status: 404 } });
  }

  // Check if user is the owner
  if (note.userId.toString() !== userId) {
    throw new Error("You are not the owner", { cause: { status: 403 } });
  }

  // Delete the note
  await NoteModel.deleteOne({ _id: noteId });

  return { message: "deleted", note };
};

export const getPaginatedNotes = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  // Get notes sorted by createdAt in descending order
  const notes = await NoteModel.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return notes;
};

export const getNoteById = async (noteId, userId) => {
  // Find the note
  const note = await NoteModel.findById(noteId);

  if (!note) {
    throw new Error("Note not found", { cause: { status: 404 } });
  }

  // Check if user is the owner
  if (note.userId.toString() !== userId) {
    throw new Error("You are not the owner", { cause: { status: 403 } });
  }

  return note;
};

export const getNoteByContent = async (userId, content) => {
  const note = await NoteModel.findOne({ userId, content });

  if (!note) {
    throw new Error("No note found", { cause: { status: 404 } });
  }

  return note;
};

export const getNotesWithUser = async (userId) => {
  const notes = await NoteModel.find({ userId })
    .select("title userId createdAt")
    .populate({
      path: "userId",
      select: "email",
    });

  return notes;
};

export const getNotesAggregateWithSearch = async (userId, searchTitle) => {
  const matchStage = { userId: new mongoose.Types.ObjectId(userId) };

  // Add search filter if provided
  if (searchTitle) {
    matchStage.title = { $regex: searchTitle, $options: "i" };
  }

  const notes = await NoteModel.aggregate([
    { $match: matchStage },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    { $unwind: "$userInfo" },
    {
      $project: {
        title: 1,
        content: 1,
        userId: 1,
        createdAt: 1,
        updatedAt: 1,
        "userInfo.name": 1,
        "userInfo.email": 1,
      },
    },
  ]);

  return notes;
};

export const deleteAllNotes = async (userId) => {
  await NoteModel.deleteMany({ userId });
  return { message: "Deleted" };
};

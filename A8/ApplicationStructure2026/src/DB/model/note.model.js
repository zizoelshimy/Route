import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      validate: {
        validator: function (value) {
          // Check if the title is not entirely uppercase
          // A title is entirely uppercase if it equals its uppercase version
          // and contains at least one letter
          const hasLetters = /[a-zA-Z]/.test(value);
          if (hasLetters && value === value.toUpperCase()) {
            return false;
          }
          return true;
        },
        message: "Title cannot be entirely uppercase",
      },
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  {
    collection: "notes",
    timestamps: true,
  },
);

// This is to avoid model overwrite issue in watch mode if the model is already compiled else compile a new model
export const NoteModel =
  mongoose.models.Note || mongoose.model("Note", noteSchema);

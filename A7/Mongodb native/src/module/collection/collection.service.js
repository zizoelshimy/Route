import { db } from "../../DB/connection.db.js";
import {
  bookCollection,
  authorCollection,
  logCollection,
} from "../../DB/model/index.js";

// Create explicit collection with validation
export const createBooksCollection = async () => {
  try {
    await db.createCollection("books", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
              minLength: 1,
              description: "title must be a non-empty string and is required",
            },
          },
        },
      },
    });
    return { ok: 1, message: "Books collection created with validation" };
  } catch (error) {
    throw error;
  }
};

// Create implicit collection by inserting data
export const createAuthorsCollection = async (data) => {
  try {
    const result = await authorCollection.insertOne(data);
    return {
      acknowledged: result.acknowledged,
      insertedId: result.insertedId,
      message: "Authors collection created implicitly",
    };
  } catch (error) {
    throw error;
  }
};

// Create capped collection
export const createLogsCollection = async () => {
  try {
    await db.createCollection("logs", {
      capped: true,
      size: 1048576, // 1MB in bytes
    });
    return {
      ok: 1,
      message: "Logs capped collection created with 1MB size limit",
    };
  } catch (error) {
    throw error;
  }
};

// Create index on books collection
export const createBooksIndex = async () => {
  try {
    const result = await bookCollection.createIndex({ title: 1 });
    return {
      indexName: result,
      message: "Index created on books collection for title field",
    };
  } catch (error) {
    throw error;
  }
};

//Insert document into books collection
export const insertBook = async (bookData) => {
  try {
    const result = await bookCollection.insertOne(bookData);
    return {
      acknowledged: result.acknowledged,
      insertedId: result.insertedId,
      message: "Book document inserted successfully",
    };
  } catch (error) {
    throw error;
  }
};

// Task 6: Insert multiple documents into books collection
export const insertMultipleBooks = async (booksData) => {
  try {
    const result = await bookCollection.insertMany(booksData);
    return {
      acknowledged: result.acknowledged,
      insertedIds: result.insertedIds,
      insertedCount: result.insertedCount,
      message: `${result.insertedCount} books inserted successfully`,
    };
  } catch (error) {
    throw error;
  }
};

// Task 7: Insert a new log into logs collection
export const insertLog = async (logData) => {
  try {
    const result = await logCollection.insertOne(logData);
    return {
      acknowledged: result.acknowledged,
      insertedId: result.insertedId,
      message: "Log inserted successfully",
    };
  } catch (error) {
    throw error;
  }
};

// Task 8: Update book with title "Future" to change year to 2022
export const updateBookByTitle = async (title, updateData) => {
  try {
    const result = await bookCollection.updateOne(
      { title: title },
      { $set: updateData },
    );
    return {
      acknowledged: result.acknowledged,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      message: `Book "${title}" updated successfully`,
    };
  } catch (error) {
    throw error;
  }
};

// Task 9: Find a book with specific title
export const findBookByTitle = async (title) => {
  try {
    const book = await bookCollection.findOne({ title: title });
    if (!book) {
      throw new Error(`Book with title "${title}" not found`);
    }
    return book;
  } catch (error) {
    throw error;
  }
};

// Task 10: Find all books published between year range
export const findBooksByYearRange = async (from, to) => {
  try {
    const books = await bookCollection
      .find({
        year: {
          $gte: parseInt(from),
          $lte: parseInt(to),
        },
      })
      .toArray();
    return books;
  } catch (error) {
    throw error;
  }
};

// Task 11: Find books where genre includes specific genre
export const findBooksByGenre = async (genre) => {
  try {
    const books = await bookCollection
      .find({
        genres: genre,
      })
      .toArray();
    return books;
  } catch (error) {
    throw error;
  }
};

// Task 12: Skip first two books, limit to next three, sorted by year descending
export const skipAndLimitBooks = async () => {
  try {
    const books = await bookCollection
      .find({})
      .sort({ year: -1 })
      .skip(2)
      .limit(3)
      .toArray();
    return books;
  } catch (error) {
    throw error;
  }
};

// Task 13: Find books where year field is stored as an integer
export const findBooksWithIntegerYear = async () => {
  try {
    const books = await bookCollection
      .find({
        year: { $type: "int" },
      })
      .toArray();
    return books;
  } catch (error) {
    throw error;
  }
};

// Task 14: Find books where genres does not include "Horror" or "Science Fiction"
export const findBooksExcludingGenres = async () => {
  try {
    const books = await bookCollection
      .find({
        genres: { $nin: ["Horror", "Science Fiction"] },
      })
      .toArray();
    return books;
  } catch (error) {
    throw error;
  }
};

// Task 15: Delete all books published before a specific year
export const deleteBooksBeforeYear = async (year) => {
  try {
    const result = await bookCollection.deleteMany({
      year: { $lt: parseInt(year) },
    });
    return {
      acknowledged: result.acknowledged,
      deletedCount: result.deletedCount,
      message: `${result.deletedCount} books deleted successfully`,
    };
  } catch (error) {
    throw error;
  }
};

// Task 16: Aggregation - Filter books after 2000 and sort by year descending
export const aggregateBooksAfter2000 = async () => {
  try {
    const books = await bookCollection
      .aggregate([{ $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }])
      .toArray();
    return books;
  } catch (error) {
    throw error;
  }
};

// Task 17: Aggregation - Find books after 2000, show only title, author, year
export const aggregateBooksAfter2000WithFields = async () => {
  try {
    const books = await bookCollection
      .aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $project: { _id: 0, title: 1, author: 1, year: 1 } },
      ])
      .toArray();
    return books;
  } catch (error) {
    throw error;
  }
};

// Task 18: Aggregation - Break array of genres into separate documents
export const aggregateUnwindGenres = async () => {
  try {
    const books = await bookCollection
      .aggregate([
        { $unwind: "$genres" },
        { $project: { title: 1, genres: 1 } },
      ])
      .toArray();
    return books;
  } catch (error) {
    throw error;
  }
};

// Task 19: Aggregation - Join books with logs collection
export const aggregateJoinBooksWithLogs = async () => {
  try {
    const result = await logCollection
      .aggregate([
        {
          $lookup: {
            from: "books",
            localField: "book_id",
            foreignField: "_id",
            as: "book_details",
          },
        },
      ])
      .toArray();
    return result;
  } catch (error) {
    throw error;
  }
};

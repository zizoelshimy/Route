import { Router } from "express";
import * as collectionController from "./collection.controller.js";

export const collectionRouter = Router();

//Create explicit collection named "books" with validation
collectionRouter.post("/books", collectionController.createBooksCollection);

//Create implicit collection named "authors"
collectionRouter.post("/authors", collectionController.createAuthorsCollection);

//Create capped collection named "logs"
collectionRouter.post(
  "/logs/capped",
  collectionController.createLogsCollection,
);

//Create index on books collection
collectionRouter.post("/books/index", collectionController.createBooksIndex);

//Insert document into books collection
export const booksRouter = Router();
booksRouter.post("/", collectionController.insertBook);

// Insert multiple books
booksRouter.post("/batch", collectionController.insertMultipleBooks);

// Update book by title
booksRouter.patch("/:title", collectionController.updateBookByTitle);

// Task 9: Find book by title
booksRouter.get("/title", collectionController.findBookByTitle);

// Task 10: Find books by year range
booksRouter.get("/year", collectionController.findBooksByYearRange);

// Task 11: Find books by genre
booksRouter.get("/genre", collectionController.findBooksByGenre);

// Task 12: Skip and limit books
booksRouter.get("/skip-limit", collectionController.skipAndLimitBooks);

// Task 13: Find books with integer year
booksRouter.get("/year-integer", collectionController.findBooksWithIntegerYear);

// Task 14: Find books excluding specific genres
booksRouter.get("/exclude-genres", collectionController.findBooksExcludingGenres);

// Task 15: Delete books before specific year
booksRouter.delete("/before-year", collectionController.deleteBooksBeforeYear);

// Task 16: Aggregation - Books after 2000
booksRouter.get("/aggregate1", collectionController.aggregateBooksAfter2000);

// Task 17: Aggregation - Books after 2000 with fields
booksRouter.get("/aggregate2", collectionController.aggregateBooksAfter2000WithFields);

// Task 18: Aggregation - Unwind genres
booksRouter.get("/aggregate3", collectionController.aggregateUnwindGenres);

// Task 19: Aggregation - Join books with logs
booksRouter.get("/aggregate4", collectionController.aggregateJoinBooksWithLogs);

// Insert log into logs collection
export const logsRouter = Router();
logsRouter.post("/", collectionController.insertLog);

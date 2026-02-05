import * as collectionService from "./collection.service.js";

// Task 1: Create explicit collection (books)
export const createBooksCollection = async (req, res, next) => {
  try {
    const result = await collectionService.createBooksCollection();
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Task 2: Create implicit collection (authors)
export const createAuthorsCollection = async (req, res, next) => {
  try {
    const result = await collectionService.createAuthorsCollection(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Task 3: Create capped collection (logs)
export const createLogsCollection = async (req, res, next) => {
  try {
    const result = await collectionService.createLogsCollection();
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Task 4: Create index on books collection
export const createBooksIndex = async (req, res, next) => {
  try {
    const result = await collectionService.createBooksIndex();
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Task 5: Insert document into books collection
export const insertBook = async (req, res, next) => {
  try {
    const result = await collectionService.insertBook(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Task 6: Insert multiple documents into books collection
export const insertMultipleBooks = async (req, res, next) => {
  try {
    const result = await collectionService.insertMultipleBooks(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Task 7: Insert a new log into logs collection
export const insertLog = async (req, res, next) => {
  try {
    const result = await collectionService.insertLog(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Task 8: Update book by title
export const updateBookByTitle = async (req, res, next) => {
  try {
    const { title } = req.params;
    const result = await collectionService.updateBookByTitle(title, req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Task 9: Find book by title
export const findBookByTitle = async (req, res, next) => {
  try {
    const { title } = req.query;
    const book = await collectionService.findBookByTitle(title);
    return res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

// Task 10: Find books by year range
export const findBooksByYearRange = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const books = await collectionService.findBooksByYearRange(from, to);
    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// Task 11: Find books by genre
export const findBooksByGenre = async (req, res, next) => {
  try {
    const { genre } = req.query;
    const books = await collectionService.findBooksByGenre(genre);
    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// Task 12: Skip and limit books
export const skipAndLimitBooks = async (req, res, next) => {
  try {
    const books = await collectionService.skipAndLimitBooks();
    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// Task 13: Find books with integer year
export const findBooksWithIntegerYear = async (req, res, next) => {
  try {
    const books = await collectionService.findBooksWithIntegerYear();
    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// Task 14: Find books excluding specific genres
export const findBooksExcludingGenres = async (req, res, next) => {
  try {
    const books = await collectionService.findBooksExcludingGenres();
    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// Task 15: Delete books before specific year
export const deleteBooksBeforeYear = async (req, res, next) => {
  try {
    const { year } = req.query;
    const result = await collectionService.deleteBooksBeforeYear(year);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Task 16: Aggregation - Books after 2000 sorted by year
export const aggregateBooksAfter2000 = async (req, res, next) => {
  try {
    const books = await collectionService.aggregateBooksAfter2000();
    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// Task 17: Aggregation - Books after 2000 with specific fields
export const aggregateBooksAfter2000WithFields = async (req, res, next) => {
  try {
    const books = await collectionService.aggregateBooksAfter2000WithFields();
    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// Task 18: Aggregation - Unwind genres
export const aggregateUnwindGenres = async (req, res, next) => {
  try {
    const books = await collectionService.aggregateUnwindGenres();
    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// Task 19: Aggregation - Join books with logs
export const aggregateJoinBooksWithLogs = async (req, res, next) => {
  try {
    const result = await collectionService.aggregateJoinBooksWithLogs();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

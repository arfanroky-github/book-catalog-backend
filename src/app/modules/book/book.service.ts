import { BookType } from "./book.interface";
import Book from "./book.model";

// create book in database
async function createBookInDb(payload: BookType) {
  const book = new Book(payload);
  return await book.save();
}

export const BookService = {
  createBookInDb,
};

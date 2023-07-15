import { PaginationType } from "@/interfaces/pagination";
import { BookFilterType, BookType } from "./book.interface";
import Book from "./book.model";
import { GenericResponse } from "@/interfaces/commonResponse";
import paginationHelper from "@/helpers/paginationHelper";
import {  bookSearchableFields } from "./book.constant";
import { SortOrder } from "mongoose";

// create book in database
async function createBookInDb(payload: BookType) {
  // before saving the new book
  // i want to lowercase the title, author and genre
  const lowercasedPayload = {
    ...payload,
    title: payload.title.toLowerCase(),
    author: payload.author.toLowerCase(),
    genre: payload.genre.toLowerCase(),
  
  }
  const book = new Book(lowercasedPayload);
  return await book.save();
}

// get single book from database by id
async function getSingleBookFromDb(id: string): Promise<BookType | null> {
  return await Book.findById(id);
}

// get all books from database with filtering and searching
async function getAllBooksFromDb(
  filters: BookFilterType,
  paginations: PaginationType
): Promise<GenericResponse<BookType[]>> {

  const { searchTerm, ...otherFilters } = filters;
  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelper(paginations);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(otherFilters).length) {
    andConditions.push({
      $and: Object.entries(otherFilters).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};


  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
}

export const BookService = {
  createBookInDb,
  getAllBooksFromDb,
  getSingleBookFromDb,
};

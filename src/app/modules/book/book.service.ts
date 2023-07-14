import { PaginationType } from "@/interfaces/pagination";
import { BookFilterType, BookType } from "./book.interface";
import Book from "./book.model";
import { GenericResponse } from "@/interfaces/commonResponse";
import paginationHelper from "@/helpers/paginationHelper";
import { bookSearchAndFiltersFields } from "./book.constant";
import { SortOrder } from "mongoose";

// create book in database
async function createBookInDb(payload: BookType) {
  const book = new Book(payload);
  return await book.save();
}


// get all books from database with filtering and searching
async function getAllBooksFromDb(
  filters: BookFilterType,
  paginations: PaginationType
): Promise<GenericResponse<BookType[]>> {
  const bookSearchableFiels = bookSearchAndFiltersFields.filter(
    (item) => !item.includes("searchTerm")
  );
  const { searchTerm, ...otherFilters } = filters;
  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelper(paginations);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFiels.map((field) => ({
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
};

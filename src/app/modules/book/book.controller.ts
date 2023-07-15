import catchAsync from "@/shared/catchAsync";
import { Request, Response } from "express";
import { BookService } from "./book.service";
import sendResponse from "@/helpers/sendResponse";
import { BookType } from "./book.interface";
import httpStatus from "http-status";
import pick from "@/shared/pick";
import { paginationFields } from "@/constants/paginationFields";
import { bookFilterableFiels } from "./book.constant";

// create book
const createBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body;

  const result = await BookService.createBookInDb(bookData);

  sendResponse<BookType | null>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Book created successfully",
    data: result,
  });
});

// get single books
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await BookService.getSingleBookFromDb(id);
  sendResponse<BookType | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book fetched successfully",
    data: result,
  });
});

// get all books
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const queryData = pick(req.query, bookFilterableFiels);
  console.log(queryData)
  const paginationProps = pick(req.query, paginationFields);

  const result = await BookService.getAllBooksFromDb(
    queryData,
    paginationProps
  );

  sendResponse<BookType[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook
};

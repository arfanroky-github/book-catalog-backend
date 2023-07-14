import catchAsync from "@/shared/catchAsync";
import { Request, Response } from "express";
import { BookService } from "./book.service";
import sendResponse from "@/helpers/sendResponse";
import { BookType } from "./book.interface";
import httpStatus from "http-status";

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

export const BookController = {
  createBook,
};

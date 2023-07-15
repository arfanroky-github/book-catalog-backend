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

// get single book
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

// update single book
const updateSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const bookData = req.body;
  const result = await BookService.updateSingleBookFromDb(id, bookData);

  sendResponse<BookType | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book is updated successfully!",
    data: result,
  });
});

// delete single book
const deleteSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await BookService.deleteSingleBookFromDb(id);

  sendResponse<BookType | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book is deleted successfully!",
    data: result,
  });
});

// get all books
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const queryData = pick(req.query, bookFilterableFiels);
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

// add book wishlist
const addBookWishlist = catchAsync(async (req: Request, res: Response) => {
  const { bookId, userId } = req.params as { bookId: string; userId: string };
  const result = await BookService.addBookWishlistInDb(bookId, userId);

  sendResponse<BookType | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book is added to wishlist successfully!",
    data: result,
  });
});

// remove book wishlist
const removeBookWishlist = catchAsync(async (req: Request, res: Response) => {
  const { bookId, userId } = req.params as { bookId: string; userId: string };
  const result = await BookService.removeBookWishlistFromDb(bookId, userId);

  sendResponse<BookType | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book is removed from wishlist successfully!",
    data: result,
  });
});

// get all wishlisted books
const getAllWishlistedBooks = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result = await BookService.getAllWishlistedBooksFromDb(userId);

    sendResponse<BookType[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book fetched successfully",
      data: result,
    });
  }
);

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
  addBookWishlist,
  getAllWishlistedBooks,
  removeBookWishlist,
};

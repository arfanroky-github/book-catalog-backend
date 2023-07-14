import catchAsync from "@/shared/catchAsync";
import { Request, Response } from "express";

// create book
const createBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body;
});

export const BookController = {
  createBook,
};

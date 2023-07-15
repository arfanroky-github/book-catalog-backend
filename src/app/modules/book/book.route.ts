import validateRequest from "@/app/middlewares/validateRequest";
import express from "express";
import { BookValidation } from "./book.validation";
import { BookController } from "./book.controller";
import auth from "@/app/middlewares/auth";
const router = express.Router();

// create book
router.post(
  "/create-book",
  auth(),
  validateRequest(BookValidation.createBookSchema),
  BookController.createBook
);

// get single book
router.get("/:id", auth(), BookController.getSingleBook);

// update single book
router.patch(
  "/:id",
  auth(),
  validateRequest(BookValidation.updateBookSchema),
  BookController.updateSingleBook
);

// get all books
router.get("/", auth(), BookController.getAllBooks);

export const BookRoutes = router;

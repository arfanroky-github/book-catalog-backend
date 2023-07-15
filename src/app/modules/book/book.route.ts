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

// delete single book
router.delete("/:id", auth(), BookController.deleteSingleBook);

// get all books
router.get("/", auth(), BookController.getAllBooks);

// add book wishlist
router.post(
  "/:bookId/wishlist/:userId",
  auth(),
  BookController.addBookWishlist
);

// remove book wishlist
router.delete(
  "/:bookId/wishlist/:userId",
  auth(),
  BookController.removeBookWishlist
);

// get all wishlisted books
router.get("/:userId/wishlist", auth(), BookController.getAllWishlistedBooks);

export const BookRoutes = router;

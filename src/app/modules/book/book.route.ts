import validateRequest from "@/app/middlewares/validateRequest";
import express from "express";
import { BookValidation } from "./book.validation";
import { BookController } from "./book.controller";
import auth from "@/app/middlewares/auth";
const router = express.Router();

// create book
router.post(
  "/book",
  auth(),
  validateRequest(BookValidation.createBookSchema),
  BookController.createBook
);

export const BookRoutes = router;

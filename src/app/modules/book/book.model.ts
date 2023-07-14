import { Schema, model } from "mongoose";
import { BookType } from "./book.interface";

const bookSchema = new Schema<BookType>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publication: {
      type: Date,
      required: true,
    },
    reviews: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Book = model<BookType>("Book", bookSchema);
export default Book;
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
      type: String,
      required: true,
      minlength: 4,
      maxlength: 4,
    },
    reviews: String,
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Assuming you have a "User" model
      },
    ],
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

import { Types } from "mongoose";

type Reviews = {
  name: string;
  picture: string;
  message: string;
};

type BookType = {
  title: string;
  author: string;
  genre: string;
  publication: string;
  reviews?: Reviews;
  wishlist: Types.ObjectId[]; // Array of ObjectIds referencing users
};

type BookFilterType = {
  searchTerm?: string;
  author?: string;
  genre?: string;
  publication?: string;
};

type BookUpdateType = {
  title?: string;
  author?: string;
  genre?: string;
  publication?: string;
};

export { BookType, BookFilterType, BookUpdateType };

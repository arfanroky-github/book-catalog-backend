import { z } from "zod";

//   Title: string;
//   Author: string;
//   Genre: string;
//   Publication: Date;
//   Reviews?: [string];

const createBookSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    author: z.string({
      required_error: "Author is required",
    }),
    genre: z.string({
      required_error: "Genre is required",
    }),
    publication: z.date({
      required_error: "Publication is required",
    }),
    reviews: z.object({
      name: z.string(),
      picture: z.string(),
      message: z.string(),
    }),
  }),
});

export const BookValidation = {
  createBookSchema,
};

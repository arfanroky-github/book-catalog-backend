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
    publication: z
      .string({
        required_error: "Publication is required",
      })
      .min(4)
      .max(4),
    reviews: z
      .object({
        name: z.string(),
        picture: z.string(),
        message: z.string(),
      })
      .optional(),
  }),
});

const updateBookSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    publication: z.string().optional(),
  }),
});

const wishlistSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "UserId is required",
    }),
  }),
});

export const BookValidation = {
  createBookSchema,
  updateBookSchema,
  wishlistSchema,
};

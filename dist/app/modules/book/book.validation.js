"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
//   Title: string;
//   Author: string;
//   Genre: string;
//   Publication: Date;
//   Reviews?: [string];
const createBookSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        author: zod_1.z.string({
            required_error: "Author is required",
        }),
        genre: zod_1.z.string({
            required_error: "Genre is required",
        }),
        publication: zod_1.z
            .string({
            required_error: "Publication is required",
        })
            .min(4)
            .max(4),
        reviews: zod_1.z
            .object({
            name: zod_1.z.string(),
            picture: zod_1.z.string(),
            message: zod_1.z.string(),
        })
            .optional(),
    }),
});
const updateBookSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        publication: zod_1.z.string().optional(),
    }),
});
const wishlistSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "UserId is required",
        }),
    }),
});
exports.BookValidation = {
    createBookSchema,
    updateBookSchema,
    wishlistSchema,
};

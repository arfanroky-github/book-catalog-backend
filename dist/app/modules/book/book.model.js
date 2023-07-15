"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User", // Assuming you have a "User" model
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;

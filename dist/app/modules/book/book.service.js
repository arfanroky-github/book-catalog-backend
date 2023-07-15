"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const paginationHelper_1 = __importDefault(require("@/helpers/paginationHelper"));
const book_constant_1 = require("./book.constant");
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("@/errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../user/user.model"));
// create book in database
function createBookInDb(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        // before saving the new book
        // i want to lowercase the title, author and genre
        const lowercasedPayload = Object.assign(Object.assign({}, payload), { title: payload.title.toLowerCase(), author: payload.author.toLowerCase(), genre: payload.genre.toLowerCase() });
        const book = new book_model_1.default(lowercasedPayload);
        return yield book.save();
    });
}
// get single book from database by id
function getSingleBookFromDb(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield book_model_1.default.findById(id);
    });
}
// update single book form database by id
function updateSingleBookFromDb(id, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        // before updating the book check if the book exists
        const book = yield book_model_1.default.findById(id);
        if (!book) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found");
        }
        // check if the payload has any value
        if (Object.keys(payload).length === 0) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "No payload provided");
        }
        // lowercase all the string value
        const { publication, title, genre, author } = payload;
        const updatedBook = {};
        if (title) {
            updatedBook["title"] = title.toLowerCase();
        }
        else if (genre) {
            updatedBook["genre"] = genre.toLowerCase();
        }
        else if (author) {
            updatedBook["author"] = author.toLowerCase();
        }
        else {
            updatedBook["publication"] = publication;
        }
        const result = yield book_model_1.default.findOneAndUpdate({ _id: id }, updatedBook, {
            new: true,
        });
        return result;
    });
}
// delete single book from database by id
function deleteSingleBookFromDb(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.default.findById(id);
        if (!book) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found");
        }
        return yield book_model_1.default.findOneAndDelete({ _id: id });
    });
}
// get all books from database with filtering and searching
function getAllBooksFromDb(filters, paginations) {
    return __awaiter(this, void 0, void 0, function* () {
        const { searchTerm } = filters, otherFilters = __rest(filters, ["searchTerm"]);
        const { page, limit, sortBy, sortOrder, skip } = (0, paginationHelper_1.default)(paginations);
        const andConditions = [];
        if (searchTerm) {
            andConditions.push({
                $or: book_constant_1.bookSearchableFields.map((field) => ({
                    [field]: {
                        $regex: searchTerm,
                        $options: "i",
                    },
                })),
            });
        }
        if (Object.keys(otherFilters).length) {
            andConditions.push({
                $and: Object.entries(otherFilters).map(([field, value]) => ({
                    [field]: value,
                })),
            });
        }
        const sortConditions = {};
        if (sortBy && sortOrder) {
            sortConditions[sortBy] = sortOrder;
        }
        const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
        const result = yield book_model_1.default.find(whereConditions)
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);
        const total = yield book_model_1.default.countDocuments(whereConditions);
        return {
            meta: {
                page,
                limit,
                total,
            },
            data: result,
        };
    });
}
// add book wishlist in database by id
function addBookWishlistInDb(bookId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.default.findById(bookId);
        if (!book) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found");
        }
        const user = user_model_1.default.isUserExist(userId);
        if (!user) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
        }
        // convert string to object id
        const convertedUserId = new mongoose_1.default.Types.ObjectId(userId);
        // Check if the book is already in wishlist
        if (book.wishlist.includes(convertedUserId)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book already in wishlist");
        }
        const result = yield book_model_1.default.findOneAndUpdate({ _id: bookId }, { $addToSet: { wishlist: userId } }, { new: true });
        return result;
    });
}
// remove book wishlist in database by id
function removeBookWishlistFromDb(bookId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.default.findById(bookId);
        if (!book) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found");
        }
        const user = user_model_1.default.isUserExist(userId);
        if (!user) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
        }
        // convert string to object id
        const convertedUserId = new mongoose_1.default.Types.ObjectId(userId);
        // check book is in wishlist or not
        if (!book.wishlist.includes(convertedUserId)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book is not in wishlist");
        }
        const result = yield book_model_1.default.findOneAndUpdate({ _id: bookId }, { $pull: { wishlist: userId } }, {
            new: true,
            projection: {
                wishlist: 0,
                __v: 0,
                createdAt: 0,
                updatedAt: 0,
            },
        });
        return result;
    });
}
// get all wishlisted books from database by user id
function getAllWishlistedBooksFromDb(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = user_model_1.default.isUserExist(userId);
        if (!user) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
        }
        const result = yield book_model_1.default.find({ wishlist: userId }, {
            wishlist: 0,
            __v: 0,
            createdAt: 0,
            updatedAt: 0,
        });
        return result;
    });
}
exports.BookService = {
    createBookInDb,
    getAllBooksFromDb,
    getSingleBookFromDb,
    updateSingleBookFromDb,
    deleteSingleBookFromDb,
    addBookWishlistInDb,
    getAllWishlistedBooksFromDb,
    removeBookWishlistFromDb,
};

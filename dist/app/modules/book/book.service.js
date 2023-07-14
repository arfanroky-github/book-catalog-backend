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
// create book in database
function createBookInDb(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = new book_model_1.default(payload);
        return yield book.save();
    });
}
// get all books from database with filtering and searching
function getAllBooksFromDb(filters, paginations) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookSearchableFiels = book_constant_1.bookSearchAndFiltersFields.filter((item) => !item.includes("searchTerm"));
        const { searchTerm } = filters, otherFilters = __rest(filters, ["searchTerm"]);
        const { page, limit, sortBy, sortOrder, skip } = (0, paginationHelper_1.default)(paginations);
        const andConditions = [];
        if (searchTerm) {
            andConditions.push({
                $or: bookSearchableFiels.map((field) => ({
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
exports.BookService = {
    createBookInDb,
    getAllBooksFromDb,
};

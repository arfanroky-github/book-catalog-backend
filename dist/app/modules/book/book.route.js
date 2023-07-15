"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const validateRequest_1 = __importDefault(require("@/app/middlewares/validateRequest"));
const express_1 = __importDefault(require("express"));
const book_validation_1 = require("./book.validation");
const book_controller_1 = require("./book.controller");
const auth_1 = __importDefault(require("@/app/middlewares/auth"));
const router = express_1.default.Router();
// create book
router.post("/create-book", (0, auth_1.default)(), (0, validateRequest_1.default)(book_validation_1.BookValidation.createBookSchema), book_controller_1.BookController.createBook);
// get single book
router.get("/:id", (0, auth_1.default)(), book_controller_1.BookController.getSingleBook);
// update single book
router.patch("/:id", (0, auth_1.default)(), (0, validateRequest_1.default)(book_validation_1.BookValidation.updateBookSchema), book_controller_1.BookController.updateSingleBook);
// delete single book
router.delete("/:id", (0, auth_1.default)(), book_controller_1.BookController.deleteSingleBook);
// get all books
router.get("/", (0, auth_1.default)(), book_controller_1.BookController.getAllBooks);
// add book wishlist
router.post("/:bookId/wishlist/:userId", (0, auth_1.default)(), book_controller_1.BookController.addBookWishlist);
// remove book wishlist
router.delete("/:bookId/wishlist/:userId", (0, auth_1.default)(), book_controller_1.BookController.removeBookWishlist);
// get all wishlisted books
router.get("/:userId/wishlist", (0, auth_1.default)(), book_controller_1.BookController.getAllWishlistedBooks);
exports.BookRoutes = router;

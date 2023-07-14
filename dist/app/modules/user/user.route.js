"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const validateRequest_1 = __importDefault(require("@middlewares/validateRequest"));
const express_1 = __importDefault(require("express"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.default)(user_validation_1.UserValidation.signupSchemaValidation), user_controller_1.UserController.signupUser);
router.get("/login", (req, res) => { });
exports.UserRoutes = router;

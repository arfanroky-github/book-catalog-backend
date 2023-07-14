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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const ApiError_1 = __importDefault(require("@/errors/ApiError"));
const user_model_1 = __importDefault(require("./user.model"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelper_1 = require("@/helpers/jwtHelper");
const config_1 = __importDefault(require("@/config"));
// create a new user in db
function signupUserInDb(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExists = yield user_model_1.default.findOne({ email: payload.email });
        if (isExists) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Email is already exists!");
        }
        const result = new user_model_1.default(payload);
        return yield result.save();
    });
}
// login user from db
function loginUserFromDb(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        // check user exist or not
        const isUserExist = yield user_model_1.default.isUserExist(payload.email);
        // if user not exist
        if (!isUserExist) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User not found!");
        }
        // check password
        const isPasswordMatched = yield user_model_1.default.isPasswordMatched(payload.password, isUserExist.password);
        // if password not matched
        if (!isPasswordMatched) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Password is incorrect!");
        }
        // create access token
        const options = {
            id: isUserExist.id,
            email: isUserExist.email,
        };
        const accessToken = jwtHelper_1.JwtHelper.createToken({
            options,
            secret: config_1.default.jwt_secret,
            expiresIn: config_1.default.jwt_expires,
        });
        // create refresh token
        const refreshToken = jwtHelper_1.JwtHelper.createToken({
            options,
            secret: config_1.default.jwt_refresh_secret,
            expiresIn: config_1.default.jwt_refresh_expires,
        });
        return { accessToken, refreshToken };
    });
}
exports.UserService = {
    signupUserInDb,
    loginUserFromDb,
};

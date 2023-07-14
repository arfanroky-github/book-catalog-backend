import ApiError from "@/errors/ApiError";
import { UserType } from "./user.interface";
import User from "./user.model";
import httpStatus from "http-status";

// create a new user in db
async function signupUserInDb(payload: UserType) {
  const isExists = await User.findOne({ email: payload.email });
  if (isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already exists!");
  }

  const result = new User(payload);
  return await result.save();
}

// login user from db
async function loginUserFromDb(payload: UserType) {
  
}

export const UserService = {
  signupUserInDb,
  loginUserFromDb,
};

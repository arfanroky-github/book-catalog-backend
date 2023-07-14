import ApiError from "@/errors/ApiError";
import { UserType } from "./user.interface";
import User from "./user.model";
import httpStatus from "http-status";
import { JwtHelper } from "@/helpers/jwtHelper";
import config from "@/config";
import { Secret } from "jsonwebtoken";

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
async function loginUserFromDb(
  payload: UserType
): Promise<{ accessToken: string; refreshToken: string }> {
  // check user exist or not
  const isUserExist = await User.isUserExist(payload.email);

  // if user not exist
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found!");
  }

  // check password
  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    isUserExist.password
  );


  // if password not matched
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password is incorrect!");
  }

  // create access token
  const options = {
    id: isUserExist.id,
    email: isUserExist.email,
  };
  const accessToken = JwtHelper.createToken({
    options,
    secret: config.jwt_secret as Secret,
    expiresIn: config.jwt_expires,
  });

  // create refresh token
  const refreshToken = JwtHelper.createToken({
    options,
    secret: config.jwt_refresh_secret as Secret,
    expiresIn: config.jwt_refresh_expires,
  });

  return { accessToken, refreshToken };
}

export const UserService = {
  signupUserInDb,
  loginUserFromDb,
};

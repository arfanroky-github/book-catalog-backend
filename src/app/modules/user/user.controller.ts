import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import sendResponse from "@/helpers/sendResponse";
import catchAsync from "@/shared/catchAsync";
import config from "@/config";

const signupUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const {
    id,
    email,
    picture
  } = await UserService.signupUserInDb(userData);



  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "User created successfully",
    success: true,
    data: {id, email, picture},
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const { accessToken, refreshToken } = await UserService.loginUserFromDb(
    userData
  );

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    success: true,
    data: {accessToken},
  });
});

export const UserController = {
  signupUser,
  loginUser,
};

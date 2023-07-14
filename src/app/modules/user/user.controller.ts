import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import sendResponse from "@/helpers/sendResponse";
import catchAsync from "@/shared/catchAsync";

const signupUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await UserService.signupUserInDb(userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "User created successfully",
    success: true,
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {});

export const UserController = {
  signupUser,
  loginUser,
};

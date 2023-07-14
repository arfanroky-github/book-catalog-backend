import config from "@/config";
import ApiError from "@/errors/ApiError";
import { JwtHelper } from "@/helpers/jwtHelper";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import User from "../modules/user/user.model";

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get token from headers
    const token = req.headers.authorization;
    // if token is not provided
    if (!token) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You not authorized to access this resource"
      );
    }

    // verify token
    const isVerifiedUser = JwtHelper.verifyToken(
      token,
      config.jwt_secret as Secret
    );
    // if not verified
    if (!isVerifiedUser) {
      throw new ApiError(httpStatus.FORBIDDEN, "Invalid token!");
    }

    // if verified set the token to the request
    req.user = isVerifiedUser;

    next();
  } catch (error) {
    next(error);
  }
};

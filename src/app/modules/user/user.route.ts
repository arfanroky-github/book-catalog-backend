import validateRequest from "@middlewares/validateRequest";
import express from "express";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation.userSchemaValidation),
  UserController.signupUser
);
router.post(
  "/login",
  validateRequest(UserValidation.userSchemaValidation),
  UserController.loginUser
);

export const UserRoutes = router;

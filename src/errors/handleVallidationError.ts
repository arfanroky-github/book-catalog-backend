import mongoose from "mongoose";
import { GenericErrorResponse } from "../interfaces/commonResponse";
import { GenericErrorMessage } from "../interfaces/errorMessage";

const handleValidationError = (
  error: mongoose.Error.ValidationError
): GenericErrorResponse => {
  const errors: GenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleValidationError;

import { ZodError, ZodIssue } from "zod";
import { GenericErrorMessage } from "../interfaces/errorMessage";
import { GenericErrorResponse } from "../interfaces/commonResponse";

const handleZodError = (error: ZodError): GenericErrorResponse => {
  const errors: GenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleZodError;

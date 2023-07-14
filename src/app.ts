import "module-alias/register";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import handleGlobalError from "@middlewares/handleGlobalError";
import { AppRoutes } from "@routes/index";
const app: Application = express();

// middlewares
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", AppRoutes);

//global error handler
app.use(handleGlobalError);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;

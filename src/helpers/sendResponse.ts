import {  Response } from "express";

type ResponseProps<TData> = {
  statusCode: number;
  message: string;
  success: boolean;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: TData | null;
};


const sendResponse = <TData>(res: Response, response: ResponseProps<TData>) => {
    const responseData: ResponseProps<TData> = {
        statusCode: response.statusCode,
        success: response.success,
        message: response.message,
        data: response.data || null,
        meta: response.meta || null || undefined
    }

    res.status(response.statusCode).json(responseData);
}

export default sendResponse;
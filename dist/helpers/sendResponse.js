"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, response) => {
    const responseData = {
        statusCode: response.statusCode,
        success: response.success,
        message: response.message,
        data: response.data || null,
        meta: response.meta || null || undefined
    };
    res.status(response.statusCode).json(responseData);
};
exports.default = sendResponse;

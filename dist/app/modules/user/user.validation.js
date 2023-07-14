"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const signupSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email({ message: "Invalid email" }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
exports.UserValidation = {
    signupSchemaValidation,
};

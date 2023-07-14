"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginationHelper = (options) => {
    const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc", } = options;
    const skip = (page - 1) * limit;
    return {
        page,
        limit,
        sortBy,
        sortOrder,
        skip,
    };
};
exports.default = paginationHelper;

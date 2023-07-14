import { SortOrder } from "mongoose";

type OptionsProps = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type PaginationHelperResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const paginationHelper = (options: OptionsProps): PaginationHelperResult => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = options;
  const skip = (page - 1) * limit;
  return {
    page,
    limit,
    sortBy,
    sortOrder,
    skip,
  };
};

export default paginationHelper;

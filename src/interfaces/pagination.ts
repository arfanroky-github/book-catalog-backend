export type PaginationType = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
export type PaginationResponseType<T> = {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;

}
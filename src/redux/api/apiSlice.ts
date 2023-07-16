import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalogue-eight.vercel.app/api/v1",
  }),
  endpoints: () => ({}),
  tagTypes: ["Books", "wishlist", "readlist", "review"],
});

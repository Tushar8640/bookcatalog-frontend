import { api } from "@/redux/api/apiSlice";

const todoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: "/todos",
      }),
    }),
  }),
});

export const { useGetTodosQuery } = todoApi;

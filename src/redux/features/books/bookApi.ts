import { api } from "@/redux/api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "/books",
      }),
      providesTags:["Books"]
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method:"DELETE"
      }),
      invalidatesTags:["Books"]
    }),
  }),
});

export const { useGetBooksQuery,useDeleteBookMutation } = bookApi;

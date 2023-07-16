import { api } from "@/redux/api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (queryUrl) => ({
        url: `/books/${queryUrl}`,
      }),
      providesTags: ["Books"],
    }),
    getBookDetails: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
      }),
      providesTags: ["Books"],
    }),
    getBookReviews: builder.query({
      query: (id) => ({
        url: `/books/addReview/${id}`,
      }),
      providesTags: ["Books"],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    // addReview: builder.mutation({
    //   query: ({id,review}) => ({
    //     url: `books/addReview/${id}`,
    //     method: "PATCH",
    //     body: "hgfghfjhfhg",
    //   }),
    //   invalidatesTags: ["Books"],
    // }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    addReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/addReview/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useDeleteBookMutation,
  useEditBookMutation,
  useGetBookDetailsQuery,
  useAddBookMutation,
  useAddReviewMutation
} = bookApi;

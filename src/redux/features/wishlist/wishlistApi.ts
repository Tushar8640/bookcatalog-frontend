import { api } from "@/redux/api/apiSlice";

const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => ({
        url: `/wish-list`,
      }),
      providesTags: ["wishlist"],
    }),

    addToWishlist: builder.mutation({
      query: (data) => ({
        url: `/wish-list`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    addReview: builder.mutation({
      query: ({ id, review }) => ({
        url: `/books/addReview/${id}`,
        body: review,
        method: "POST",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        console.log(arg);
        try {
          const result = await queryFulfilled;
          console.log(result?.data);
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
  }),
});

export const { useGetWishlistQuery, useAddToWishlistMutation ,useAddReviewMutation} = wishlistApi;

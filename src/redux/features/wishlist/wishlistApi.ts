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
  }),
});

export const { useGetWishlistQuery, useAddToWishlistMutation } = wishlistApi;

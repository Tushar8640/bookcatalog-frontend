import { api } from "@/redux/api/apiSlice";

const readlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReadlist: builder.query({
      query: () => ({
        url: `/read-list`,
      }),
      providesTags: ["readlist"],
    }),

    addToReadlist: builder.mutation({
      query: (data) => ({
        url: `/read-list`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["readlist"],
    }),
  }),
});

export const { useGetReadlistQuery, useAddToReadlistMutation } = readlistApi;

import { api } from "@/redux/api/apiSlice";
import { setUser } from "./authSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        body: data,
        method: "POST",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result?.data?.data.accessToken);
          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: result?.data?.data.accessToken,
            })
          );
          dispatch(
            setUser({
              token: result?.data?.data.accessToken,
            })
          );
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    // getBookDetails: builder.query({
    //   query: (id) => ({
    //     url: `/books/${id}`,
    //   }),
    //   providesTags: ["Books"],
    // }),
    // addBook: builder.mutation({
    //   query: (data) => ({
    //     url: `/books`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Books"],
    // }),
    // deleteBook: builder.mutation({
    //   query: (id) => ({
    //     url: `/books/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Books"],
    // }),
    // editBook: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/books/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Books"],
    // }),
  }),
});

export const { useLoginMutation } = authApi;

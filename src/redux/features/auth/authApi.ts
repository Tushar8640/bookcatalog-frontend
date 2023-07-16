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

    register: builder.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

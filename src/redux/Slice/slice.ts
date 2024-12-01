import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_URL from "../../constant/apiUrl";

declare global {
  interface ImportMeta {
    env: {
      VITE_APP_API_URL: string;
    };
  }
}

const BASE_URL = import.meta.env.VITE_APP_API_URL;

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    mode: "cors",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: `${API_URL.register}`,
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `${API_URL.login}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = apiSlice;

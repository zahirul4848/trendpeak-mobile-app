import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { baseApiUrl } from "../constants";

const USER_URL = "/api/user";

export const userApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
    prepareHeaders: (headers, {getState})=> {
      const token = getState().auth?.userInfo?.token;
      if(token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  reducerPath: "userApi",
  tagTypes: ["USER"],
  endpoints: (builder)=> ({
    login: builder.mutation({
      query: (data)=> ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data)=> ({
        url: `${USER_URL}/forgotPassword`,
        method: "PUT",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data)=> ({
        url: USER_URL,
        method: "POST",
        body: data,
      }),
    }),
    toggleWishlist: builder.mutation({
      query: (data)=> ({
        url: `${USER_URL}/wishlist`,
        method: "PUT",
        body: data,
      }),
    }),
    getWishlist: builder.query({
      query: ()=> ({
        url: `${USER_URL}/wishlist`,
        method: "GET",
      }),
    }),
    getUserProfile: builder.query({
      query: ()=> ({
        url: `${USER_URL}/profile`,
        method: "GET",
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data)=> ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteMyAccount: builder.mutation({
      query: (data)=> ({
        url: `${USER_URL}/deleteme`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});


export const {
  useLoginMutation,
  useRegisterMutation,
  useToggleWishlistMutation,
  useGetWishlistQuery,
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useForgotPasswordMutation,
  useDeleteMyAccountMutation,
} = userApiSlice;
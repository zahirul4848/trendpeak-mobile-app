import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { baseApiUrl } from "../constants";

const CATEGORY_URL = "/api/category";

export const categoryApiSlice = createApi({
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
  reducerPath: "categoryApi",
  tagTypes: ["CATEGORY"],
  endpoints: (builder)=> ({
    getAllCategories: builder.query({
      query: ()=> ({
        url: CATEGORY_URL,
        method: "GET",
      }),
    }),
    getCategory: builder.query({
      query: (id)=> ({
        url: `${CATEGORY_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});


export const {
  useGetAllCategoriesQuery,
  useLazyGetCategoryQuery,
} = categoryApiSlice;
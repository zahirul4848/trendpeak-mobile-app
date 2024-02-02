import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { baseApiUrl } from "../constants";

const PRODUCT_URL = "/api/product";

export const productApiSlice = createApi({
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
  reducerPath: "productApi",
  tagTypes: ["PRODUCT"],
  endpoints: (builder)=> ({
    getAllProducts: builder.query({
      query: ({order='', categoryId='', name="", pageNumber="", pageSize= ""})=> ({
        url: `${PRODUCT_URL}?order=${order}&categoryId=${categoryId}&name=${name}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
    getProduct: builder.query({
      query: (id)=> ({
        url: `${PRODUCT_URL}/${id}`,
        method: "GET",
      }),
    }),
    createReview: builder.mutation({
      query: ({id, data})=> ({
        url: `${PRODUCT_URL}/${id}/review`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});


export const {
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useGetProductQuery,
  useCreateReviewMutation,
} = productApiSlice;
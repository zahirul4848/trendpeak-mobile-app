import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { baseApiUrl } from "../constants";

const ORDER_URL = "/api/order";

export const orderApiSlice = createApi({
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
  reducerPath: "orderApi",
  tagTypes: ["ORDER"],
  endpoints: (builder)=> ({
    getAllOrders: builder.query({
      query: ()=> ({
        url: `${ORDER_URL}`,
        method: "GET",
      }),
    }),
    getUserOrders: builder.query({
      query: ()=> ({
        url: `${ORDER_URL}/profile`,
        method: "GET",
      }),
    }),
    getOrder: builder.query({
      query: (id)=> ({
        url: `${ORDER_URL}/${id}`,
        method: "GET",
      }),
    }),
    createOrder: builder.mutation({
      query: (data)=> ({
        url: ORDER_URL,
        method: "POST",
        body: data,
      }),
    }),
    // updateProduct: builder.mutation({
    //   query: ({id, data})=> ({
    //     url: `${PRODUCT_URL}/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),
    payOrder: builder.mutation({
      query: (id)=> ({
        url: `${ORDER_URL}/paid/${id}`,
        method: "PUT",
      }),
    }),
    deliverOrder: builder.mutation({
      query: (id)=> ({
        url: `${ORDER_URL}/deliver/${id}`,
        method: "PUT",
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id)=> ({
        url: `${ORDER_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});


export const {
  useGetAllOrdersQuery,
  useGetUserOrdersQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
  useDeleteOrderMutation,
  usePayOrderMutation,
  useDeliverOrderMutation,
} = orderApiSlice;
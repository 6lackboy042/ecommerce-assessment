import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiCart, CartsResponse } from '../../types/cart';

export const cartsApi = createApi({
  reducerPath: 'cartsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (builder) => ({
    getCarts: builder.query<CartsResponse, void>({
      query: () => '/carts',
    }),
    getCart: builder.query<ApiCart, number>({
      query: (id) => `/carts/${id}`,
    }),
    getCartsByUser: builder.query<CartsResponse, number>({
      query: (userId) => `/carts/user/${userId}`,
    }),
    deleteCart: builder.mutation<ApiCart, number>({
      query: (id) => ({
        url: `/carts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useDeleteCartMutation,
  useGetCartQuery,
  useGetCartsByUserQuery,
  useGetCartsQuery,
} = cartsApi;

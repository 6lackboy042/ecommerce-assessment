import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product, ProductsResponse } from '../../types/product';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, string | void>({
      query: (searchQuery = '') =>
        searchQuery
          ? { url: '/products/search', params: { q: searchQuery } }
          : '/products',
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
    getProductCategoryList: builder.query<string[], void>({
      query: () => '/products/category-list',
    }),
    getProductsByCategory: builder.query<ProductsResponse, string>({
      query: (category) => `/products/category/${category}`,
    }),
  }),
});

export const {
  useGetProductCategoryListQuery,
  useGetProductQuery,
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} = productsApi;

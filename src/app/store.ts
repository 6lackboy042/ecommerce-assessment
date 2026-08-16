import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import { cartsApi } from '../features/carts/cartsApi';
import { productsApi } from '../features/products/productsApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [cartsApi.reducerPath]: cartsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartsApi.middleware, productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

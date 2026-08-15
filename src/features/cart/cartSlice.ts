import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';

type CartItem = Pick<Product, 'id' | 'title' | 'price'> & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Pick<Product, 'id' | 'title' | 'price'>>) {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      state.items.push({ ...action.payload, quantity: 1 });
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const existingItem = state.items.find((item) => item.id === action.payload);

      if (!existingItem) {
        return;
      }

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        return;
      }

      existingItem.quantity -= 1;
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, decreaseQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

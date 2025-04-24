import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../interface/CartItem";

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "qty">>) => {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) {
        item.qty += 1;
      } else {
        state.push({ ...action.payload, qty: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },

    increaseQty: (state, action: PayloadAction<number>) => {
      const item = state.find((i) => i.id === action.payload);
      if (item) item.qty += 1;
    },

    decreaseQty: (state, action: PayloadAction<number>) => {
      const item = state.find((i) => i.id === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
    },
    clearCart: () => [],
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

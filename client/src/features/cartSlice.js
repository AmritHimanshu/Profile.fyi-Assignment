// slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    count: 0,
  },
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const { setCount, increment, decrement } = cartSlice.actions;
export const selectCount = (state) => state.cart.count;
export default cartSlice.reducer;

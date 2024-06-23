// productSlice.js

import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
  },
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    fetchProductsFailure: (state) => {
      state.loading = false;
    },
    incrementQuantity: (state, action) => {
        const { productId } = action.payload;
        const item = state.products.find(item => item._id === productId);
        if (item) {
          item.quantity += 1;
        }
      },
      decrementQuantity: (state, action) => {
        const { productId } = action.payload;
        const item = state.products.find(item => item._id === productId);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        }
      },
      removeFromCart: (state, action) => {
        const { productId } = action.payload;
        state.products = state.products.filter(item => item._id !== productId);
      },
  },
});

export const { fetchProductsStart, fetchProductsSuccess, removeFromCart, fetchProductsFailure , incrementQuantity , decrementQuantity } = productSlice.actions;
export default productSlice.reducer;

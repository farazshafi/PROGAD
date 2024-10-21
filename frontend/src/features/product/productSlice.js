import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const selectedProduct = (state) => state.product.products;
export const { setProducts } = productSlice.actions;
export default productSlice.reducer;

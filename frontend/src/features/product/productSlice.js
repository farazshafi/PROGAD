import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  page : 1,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setPage(state,action){
      state.page = action.payload;
    }
  },
});

export const selectedProduct = (state) => state.product.products;
export const selectedProductPage = (state) => state.product.page;
export const { setProducts, setPage } = productSlice.actions;
export default productSlice.reducer;

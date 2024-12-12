import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  page : 1,
  fetchProduct: false,
  keyword:""
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
    },
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    fetchProduct(state) {
      state.fetchProduct = !state.fetchProduct;
    }
  },
});

export const selectedProduct = (state) => state.product.products;
export const selectedProductPage = (state) => state.product.page;
export const selectedKeyword = (state) => state.product.keyword;
export const selectedFetchProduct = (state) => state.product.fetchProduct;
export const { setProducts, setPage, fetchProduct, setKeyword } = productSlice.actions;
export default productSlice.reducer;

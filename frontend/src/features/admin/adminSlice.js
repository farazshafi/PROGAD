import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminProducts: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminProducts(state, action) {
      state.adminProducts = action.payload;
    },
  },
});

export const selectedAdminProducts = (state) => state.admin.adminProducts;
export const { setAdminProducts } = adminSlice.actions;
export default adminSlice.reducer;

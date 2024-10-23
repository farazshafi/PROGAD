import { createSlice } from "@reduxjs/toolkit";

const savedAdmin = JSON.parse(localStorage.getItem("admin"))

const initialState = {
  adminProducts: [],
  admin:savedAdmin || null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminProducts(state, action) {
      state.adminProducts = action.payload;
    },
    setAdmin(state,action){
      state.admin = action.payload;
      localStorage.setItem("admin",JSON.stringify(state.admin))
    }
  },
});

export const selectedAdminProducts = (state) => state.admin.adminProducts;
export const selectedAdmin = (state) => state.admin.admin;
export const { setAdminProducts,setAdmin } = adminSlice.actions;
export default adminSlice.reducer;

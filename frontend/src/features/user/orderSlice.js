import { createSlice } from "@reduxjs/toolkit";

const savedShippingAddress = JSON.parse(localStorage.getItem("shippingAddress")) || {};
const savedPaymentMethod = JSON.parse(localStorage.getItem("paymentMethod")) || "";

const initialState = {
  orderDetails: {
    shippingAddress: savedShippingAddress || {},
    paymentMethod: savedPaymentMethod, 
    totalAmount:null,
    tax:null,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSummaryData(state,action){
      state.orderDetails.tax = action.payload.tax
      state.orderDetails.totalAmount = action.payload.totalAmount
    },
    setShippingAddress(state, action) {
      state.orderDetails.shippingAddress = action.payload;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.orderDetails.shippingAddress)
      );
    },
    setPaymentMethod(state,action){
        state.orderDetails.paymentMethod = action.payload;
        localStorage.setItem("paymentMethod",JSON.stringify(state.orderDetails.paymentMethod))
    }
  },
});

export const selectedOrder = (state) => state.order.orderDetails;
export const {setShippingAddress, setPaymentMethod, setSummaryData} = orderSlice.actions
export default orderSlice.reducer

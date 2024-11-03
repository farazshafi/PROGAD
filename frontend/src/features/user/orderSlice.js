import { createSlice } from "@reduxjs/toolkit";

const savedShippingAddress = JSON.parse(localStorage.getItem("shippingAddress")) || {};
const savedPaymentMethod = JSON.parse(localStorage.getItem("paymentMethod")) || "";

const initialState = {
  orderDetails: {
    shippingAddress: savedShippingAddress || {},
    paymentMethod: savedPaymentMethod, 
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
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
export const {setShippingAddress, setPaymentMethod} = orderSlice.actions
export default orderSlice.reducer

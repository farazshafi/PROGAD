import { createSlice } from "@reduxjs/toolkit";

const savedShippingAddress =
  JSON.parse(localStorage.getItem("shippingAddress")) || {};
const savedPaymentMethod =
  JSON.parse(localStorage.getItem("paymentMethod")) || null;
const savedOrderSummary =
  JSON.parse(localStorage.getItem("orderSummary")) || {};

const initialState = {
  orderDetails: {
    shippingAddress: savedShippingAddress || {},
    paymentMethod: savedPaymentMethod,
    totalAmount: savedOrderSummary.totalAmount || null,
    tax: savedOrderSummary.tax || null,
    couponDiscount: savedOrderSummary.couponDiscount || null,
    deliveryFee: savedOrderSummary.deliveryFee || null,
    subTotal: savedOrderSummary.subTotal || null,
    couponCode: savedOrderSummary.coupon || null,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSummaryData(state, action) {
      state.orderDetails.tax = action.payload.tax;
      state.orderDetails.totalAmount = action.payload.totalAmount;
      state.orderDetails.couponDiscount = action.payload.couponDiscount;
      state.orderDetails.deliveryFee = action.payload.deliveryFee;
      state.orderDetails.subTotal = action.payload.subTotal;
      state.orderDetails.couponCode = action.payload.couponCode;

      localStorage.setItem(
        "orderSummary",
        JSON.stringify({
          totalAmount: state.orderDetails.totalAmount,
          tax: state.orderDetails.tax,
          couponDiscount: state.orderDetails.couponDiscount,
          deliveryFee: state.orderDetails.deliveryFee,
          subTotal: state.orderDetails.subTotal,
          couponCode: state.orderDetails.couponCode,
        })
      );
    },
    setShippingAddress(state, action) {
      state.orderDetails.shippingAddress = action.payload;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.orderDetails.shippingAddress)
      );
    },
    setPaymentMethod(state, action) {
      state.orderDetails.paymentMethod = action.payload;
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(state.orderDetails.paymentMethod)
      );
    },
  },
});

export const selectedOrder = (state) => state.order.orderDetails;
export const { setShippingAddress, setPaymentMethod, setSummaryData } =
  orderSlice.actions;
export default orderSlice.reducer;

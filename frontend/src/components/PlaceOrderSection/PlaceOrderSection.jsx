import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, Paper, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectedOrder, setSummaryData } from "../../features/user/orderSlice";
import { selectedUser } from "../../features/user/userSlice";
import { clearCart, selectedCart } from "../../features/user/cartSlice";
import { handleRazorpayApi, makeOrderApi } from "../../api/orderApi";
import { toast } from "react-toastify";
import { Button, ChakraProvider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import OrderAnimation from "../../assets/animations/order.json";
import Lottie from "lottie-react";
import CouponSection from "../CouponSection";

const PlaceOrderSection = () => {
  const orderDetails = useSelector(selectedOrder);
  const user = useSelector(selectedUser);
  const cartItems = useSelector(selectedCart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showOrderedAnimation, setShowOrderedAnimation] = useState(false);

  const [orderData, setOrderData] = useState({
    user: user._id,
    items: cartItems,
    status: "pending",
    tax: orderDetails.tax,
    deliveryCost: orderDetails.deliveryFee || 0,
    shippingAddress: orderDetails.shippingAddress.id,
    paymentMethod: orderDetails.paymentMethod,
  });

  const handlePayment = async () => {
    try {
      const filteredItems = cartItems.map(
        ({ id, quantity, price, subTotal }) => ({
          id,
          quantity,
          price,
          subTotal,
        })
      );

      const formattedOrderData = {
        ...orderData,
        items: filteredItems,
        deliveryCost: orderDetails.deliveryFee,
        tax: parseFloat(orderDetails.tax.replace("%", "")),
        totalPrice: Number(orderDetails.totalAmount),
        paymentMethod:
          orderDetails.paymentMethod === "cashOnDelivery"
            ? "cash on delivery"
            : orderDetails.paymentMethod,
        couponCode: orderDetails.couponCode ? orderDetails.couponCode : null,
        couponDiscount: orderDetails.couponDiscount || 0,
        status: "pending",
        paymentStatus: "unpaid",
      };

      if (orderDetails.paymentMethod === "razorpay") {
        try {
          const paymentResult = await handleRazorpayApi(
            orderDetails.totalAmount,
            user,
            orderDetails.shippingAddress
          );

          console.log("payment status frntend", paymentResult);

          const result = await makeOrderApi({
            ...formattedOrderData,
            paymentStatus: "paid",
            razorpayOrderId: paymentResult.razorpay_order_id,
          });

          console.log("payment result :", result);

          if (result.response && result.response.status >= 400) {
            toast.error(result.response.data.message);
            return;
          }

          setShowOrderedAnimation(true);
          setTimeout(() => {
            setShowOrderedAnimation(false);
            dispatch(clearCart());
            navigate(`/order_success/${result?.data?.order?.orderId}`);
          }, 4000);
        } catch (error) {
          console.log("errror ind", error);
          const result = await makeOrderApi({
            ...formattedOrderData,
            paymentStatus: "unpaid",
          });
          console.log("payment result :", result);

          if (result.response) {
            const { status } = result.response;
            if (status === 400 || status === 404 || status === 500) {
              toast.error(
                result.response.data.message ||
                  "Payment failed, order saved as pending."
              );
              return;
            }
            toast.error(result.response.data.message);
            return;
          }

          setTimeout(() => {
            toast.warning("Payment failed, order saved as pending.");
          }, 5000);
          setShowOrderedAnimation(true);
          setTimeout(() => {
            setShowOrderedAnimation(false);
            dispatch(clearCart());
            navigate(`/order_success/${result.data.order.orderId}`);
          }, 4000);
        }
      } else {
        const result = await makeOrderApi({
          ...formattedOrderData,
          paymentStatus: "unpaid",
        });
        console.log("payment result :", result);

        if (result.response && result.response.status >= 400) {
          toast.error(result.response.data.message);
          return;
        }

        setShowOrderedAnimation(true);
        setTimeout(() => {
          setShowOrderedAnimation(false);
          dispatch(clearCart());
          navigate(`/order_success/${result.data.order.orderId}`);
        }, 4000);
      }
    } catch (err) {
      console.error("Error processing order", err);
    }
  };

  const handleApply = async (dis) => {
    const originalAmount =
      orderDetails.subTotal || Number(orderDetails.totalAmount); // Use subtotal if available
    const discountValue = (dis / 100) * originalAmount; // Calculate the discount value
    const discountedAmount = originalAmount - discountValue; // Subtract the discount from the original amount

    // Calculate tax as a percentage of the discounted amount
    const taxAmount = (discountedAmount * (orderDetails.tax || 0)) / 100;

    // Add delivery fee (if any) and calculate the final total
    const total = (
      discountedAmount +
      taxAmount +
      Number(orderDetails.deliveryFee || 0)
    ).toFixed(2);

    dispatch(
      setSummaryData({
        ...orderDetails,
        couponDiscount: dis, // Store the discount percentage
        totalAmount: total, // Update total after applying discount
      })
    );

    console.log("Discount applied: ", dis, "New total: ", total);
  };

  useEffect(() => {
    if (cartItems && cartItems.length < 1) {
      return navigate("/cart");
    }
    if (!orderDetails.paymentMethod) {
      toast.warning("Please select a payment method");
      return navigate("/cart_process/payment");
    }
  }, []);

  return (
    <>
      {showOrderedAnimation && (
        <div className="animation-overlay">
          <Lottie
            animationData={OrderAnimation}
            style={{
              width: 300,
              height: 300,
            }}
            loop={true}
            autoPlay={true}
          />
        </div>
      )}

      <Box
        sx={{
          padding: "20px",
          color: "#fff",
          minHeight: "100vh",
        }}
      >
        <div className="w-full flex flex-col lg:flex-row">
          <div className="p-3 gap-3 font-poppins w-full flex flex-col lg:flex-row">
            {/* address */}
            <div className="p-3 bg-gray-100 h-min text-black rounded">
              <p className="text-lg font-semibold">Address</p>
              <p className="text-sm">
                Country:{" "}
                <span className="font-semibold">
                  {orderDetails.shippingAddress.country}
                </span>
              </p>
              <p className="text-sm">
                State:{" "}
                <span className="font-semibold">
                  {orderDetails.shippingAddress.state}
                </span>
              </p>
              <p className="text-sm">
                City:{" "}
                <span className="font-semibold">
                  {orderDetails.shippingAddress.city}
                </span>
              </p>
              <p className="text-sm">
                Zip Code:{" "}
                <span className="font-semibold">
                  {orderDetails.shippingAddress.zipCode}
                </span>
              </p>
              <p className="text-sm">
                Street:{" "}
                <span className="font-semibold">
                  {orderDetails.shippingAddress.street}
                </span>
              </p>
              <p className="text-sm">
                Apartment:{" "}
                <span className="font-semibold">
                  {orderDetails.shippingAddress.apartment}
                </span>
              </p>
              <p className="text-sm">
                Phone Number:{" "}
                <span className="font-semibold">
                  {orderDetails.shippingAddress.phoneNumber}
                </span>
              </p>
            </div>
            {/* user and payment */}
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-gray-100 h-min text-black rounded">
                <p className="text-lg font-semibold">User</p>
                <p className="text-sm">
                  Name: <span className="font-semibold">{user.name}</span>
                </p>
                <p className="text-sm">
                  Email: <span className="font-semibold">{user.email}</span>
                </p>
              </div>
              <div className="p-3 bg-gray-100 h-min text-black rounded">
                <p className="text-lg font-semibold">Payment Method</p>
                <p className="text-sm">
                  Payment:{" "}
                  <span className="font-semibold">
                    {orderDetails.paymentMethod}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className=" font-poppins flex-1 flex-row">
            <div className="bg-black flex flex-col gap-2 rounded p-3">
              <CouponSection applyCoupon={handleApply} summary={orderDetails} />
              <div className="flex justify-between">
                <p>Subtotal: </p>
                <p>₹ {orderDetails?.subTotal}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax: </p>
                <p>₹ {orderDetails?.tax}%</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Fee: </p>
                <p>
                  {orderDetails?.deliveryFee === null ||
                  orderDetails?.deliveryFee === 0
                    ? "Free"
                    : orderDetails?.deliveryFee}
                </p>
              </div>
              {orderDetails.couponDiscount !== null &&
                orderDetails.couponDiscount !== 0 && (
                  <div className="flex justify-between">
                    <p>Coupon Applied</p>
                    <p>-{orderDetails?.couponDiscount}%</p>
                  </div>
                )}
              <div className="flex justify-between">
                <p>Total Amount: </p>
                <p>{orderDetails?.totalAmount}</p>
              </div>
              <div className="text-center items-center">
                <button
                  onClick={handlePayment}
                  className={`w-full flex text-white rounded justify-between py-2 px-3 bg-[#ff7f11]`}
                >
                  Proceed to Checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H11"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="font-semibold font-poppins text-lg mt-3">Order Items:</p>
        {cartItems.length > 0 && (
          <div className="space-y-4 mt-3 border-t border-white">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center font-poppins p-4 rounded-lg shadow-white shadow-[rgba(255,255,255,0.05)] shadow-md space-y-4 sm:space-y-0 sm:space-x-4 bg-gray-200 !text-black sm:!text-white sm:bg-transparent"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />

                {/* Details */}
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-400">Price: ₹{item.price}</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center space-x-2">
                  <Typography sx={{ color: "white" }}>
                    Quantity: {item.quantity}
                  </Typography>
                </div>

                {/* Subtotal */}
                <div>
                  <p className="text-lg font-semibold">
                    Total:{" "}
                    <span className="text-[#ff7f11]">
                      ₹{item.subTotal.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Box>
    </>
  );
};

export default PlaceOrderSection;

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

          console.log("payment result :",result)

          if (result.response && result.response.status >= 400) {
            toast.error(result.response.data.message);
            return;
          }

          setShowOrderedAnimation(true);
          setTimeout(() => {
            setShowOrderedAnimation(false);
            dispatch(clearCart());
            navigate(`/order_success/${result.data.orderId}`)
          }, 4000);
        } catch (error) {
          console.log("errror ind", error);
          const result = await makeOrderApi({
            ...formattedOrderData,
            paymentStatus: "unpaid",
          });
          console.log("payment result :",result)


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
            navigate(`/order_success/${result.data.orderId}`)
          }, 4000);
        }
      } else {
        const result = await makeOrderApi({
          ...formattedOrderData,
          paymentStatus: "unpaid",
        });
        console.log("payment result :",result)


        if (result.response && result.response.status >= 400) {
          toast.error(result.response.data.message);
          return;
        }

        setShowOrderedAnimation(true);
        setTimeout(() => {
          setShowOrderedAnimation(false);
          dispatch(clearCart());
          navigate(`/order_success/${result.data.orderId}`)
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
    if(!orderDetails.paymentMethod){
      toast.warning("Please select a payment method")
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
              // backgroundColor: "white",
              // borderRadius: "15%",
              // padding: "20px",
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
        <Grid container spacing={4}>
          <Grid item lg={4} xs={12}>
            <Paper
              sx={{ padding: "20px", background: "#212121", color: "white" }}
            >
              <Typography variant="h6">Saved Address</Typography>
              <Divider
                sx={{ height: "1px", background: "white", margin: "10px 0" }}
              />
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body1">
                  Address: {orderDetails.shippingAddress.country},{" "}
                  {orderDetails.shippingAddress.state},{" "}
                  {orderDetails.shippingAddress.city},{" "}
                  {orderDetails.shippingAddress.zipCode},
                  {orderDetails.shippingAddress.street},{" "}
                  {orderDetails.shippingAddress.address},
                  {orderDetails.shippingAddress.apartment},{" "}
                  {orderDetails.shippingAddress.phoneNumber}
                </Typography>
              </Grid>
              <Typography variant="body1">User Details</Typography>
              <Typography variant="body1">{user.name}</Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Paper>
          </Grid>

          {/* Payment Method Section for PayPal */}
          <Grid item lg={4} xs={12}>
            <Paper
              sx={{
                padding: "20px",
                background: "#212121",
                color: "white",
              }}
            >
              <Typography variant="h6">Payment Method</Typography>
              <Divider
                sx={{ height: "1px", background: "white", margin: "10px 0" }}
              />
              <Typography variant="body1">
                {orderDetails.paymentMethod}
              </Typography>
              <Typography sx={{ mb: "20px" }} variant="body2">
                {/* Pay securely using your PayPal account. */}
              </Typography>
            </Paper>
          </Grid>

          {/* Cart items */}
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: "20px",
                backgroundColor: "#212121",
                color: "white",
              }}
            >
              <Typography variant="h6">Cart Items</Typography>
              <Divider
                sx={{ height: "1px", background: "white", margin: "10px 0" }}
              />
              {cartItems.map((item) => (
                <Grid key={item.id} container alignItems="center">
                  <Grid item xs={2}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "80px", height: "auto" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1">{item.name}</Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="center">
                    <Typography variant="body1">X{item.quantity}</Typography>
                    <Typography variant="body1">₹ {item.price}</Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="right">
                    <Typography variant="body1">
                      ₹ {Number(item.quantity * item.price)}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Paper>
          </Grid>

          {/* Price Summary */}
          <Grid item lg={5} xs={12}>
            <Card
              sx={{
                padding: "20px",
                backgroundColor: "#212121",
                color: "white",
              }}
            >
              <CouponSection applyCoupon={handleApply} summary={orderDetails} />

              <Grid container justifyContent="space-between">
                <Typography
                  variant="body1"
                  sx={{ fontFamily: '"Istok Web", sans-serif' }}
                >
                  Subtotal
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: '"Istok Web", sans-serif' }}
                >
                  ₹ {orderDetails?.subTotal}
                </Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography
                  variant="body1"
                  sx={{ fontFamily: '"Istok Web", sans-serif' }}
                >
                  Tax
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: '"Istok Web", sans-serif' }}
                >
                  {orderDetails?.tax}%
                </Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography
                  variant="body1"
                  sx={{ fontFamily: '"Istok Web", sans-serif' }}
                >
                  Delivery Fee
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: '"Istok Web", sans-serif' }}
                >
                  {orderDetails?.deliveryFee}
                </Typography>
              </Grid>
              {orderDetails.couponDiscount !== undefined &&
                orderDetails.couponDiscount !== 0 && (
                  <Grid container justifyContent="space-between">
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: '"Istok Web", sans-serif' }}
                    >
                      Coupon Discount
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: '"Istok Web", sans-serif' }}
                    >
                      {orderDetails?.couponDiscount}%
                    </Typography>
                  </Grid>
                )}

              <Divider
                sx={{ height: "1px", background: "white", mt: "20px" }}
              />
              <Grid container justifyContent="space-between" mt={2}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Istok Web", sans-serif',
                    fontWeight: 800,
                  }}
                >
                  TOTAL
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Istok Web", sans-serif',
                    fontWeight: 800,
                    color: "#FF7F11",
                  }}
                >
                  ₹ {orderDetails?.totalAmount}/-
                </Typography>
              </Grid>
            </Card>
          </Grid>

          {/* Payment Methods */}
          <Grid item lg={7} xs={12}>
            <Card
              sx={{
                padding: "20px",
                backgroundColor: "#333",
                textAlign: "center",
              }}
            >
              <ChakraProvider>
                <Button
                  onClick={handlePayment}
                  sx={{
                    width: "100%",
                    bg: "#ff7f11",
                    paddingTop: "30px",
                    paddingBottom: "30px",
                  }}
                >
                  Place Order
                </Button>
              </ChakraProvider>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PlaceOrderSection;

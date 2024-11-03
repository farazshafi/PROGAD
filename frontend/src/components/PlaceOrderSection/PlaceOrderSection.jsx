import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, Paper, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { selectedOrder } from "../../features/user/orderSlice";
import { selectedUser } from "../../features/user/userSlice";
import { selectedCart } from "../../features/user/cartSlice";
import { makeOrderApi } from "../../api/orderApi";
import { toast } from "react-toastify";
import { Button, ChakraProvider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import OrderAnimation from "../../assets/animations/order.json";
import Lottie from "lottie-react";

const PlaceOrderSection = () => {
  const orderDetails = useSelector(selectedOrder);
  const user = useSelector(selectedUser);
  const cartItems = useSelector(selectedCart);

  const navigate = useNavigate();

  const [showOrderedAnimation, setShowOrderedAnimation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({
    summary: 0,
    tax: 0,
    subTotal: 0,
    total: 0,
    delivery: 0,
    offer: 0,
    taxPercent: "",
    offerPercentage: "",
  });
  const [orderData, setOrderData] = useState({
    user: user._id,
    items: cartItems,
    status: "pending",
    tax: orderDetails.tax,
    deliveryCost: 0,
    shippingAddress: orderDetails.shippingAddress.id,
    paymentMethod: orderDetails.paymentMethod,
  });

  const calculateSummary = () => {
    const subTotal = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    const taxRate = 0.011; //1.1%
    // const offerDiscount = 0.2; // 20%
    const tax = subTotal * taxRate;
    // const discount = subTotal * offerDiscount;
    const deliveryFee = subTotal > 500 ? 0 : 40;
    const total = (subTotal + tax + deliveryFee).toFixed(2);
    const taxPercentage = (taxRate * 100).toFixed(1) + "%";
    // const offerPercentage = (offerDiscount * 100).toFixed(0) + "%";

    setSummary({
      subTotal,
      tax,
      delivery: deliveryFee,
      // discount,
      total,
      taxPercent: taxPercentage,
      // offerPercentage,
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

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
        deliveryCost: summary.delivery,
        tax: summary.tax,
        totalPrice: summary.total,
        paymentMethod:
          orderDetails.paymentMethod === "cashOnDelivery"
            ? "cash on delivery"
            : orderDetails.paymentMethod,
      };

      const result = await makeOrderApi(formattedOrderData);
      console.log("order api result", result);

      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          setLoading(false);
          return;
        }
      }
      setShowOrderedAnimation(true);
      setTimeout(() => {
        setShowOrderedAnimation(false);
        navigate("/order_success");
      }, 4000);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateSummary();
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
                    <Typography variant="body1">Rs. {item.price}</Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="right">
                    <Typography variant="body1">
                      Rs. {Number(item.quantity * item.price)}
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
                  Rs. {summary.subTotal}
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
                  {summary.taxPercent}
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
                  {summary.delivery === 0 ? "free" : "Rs. " + summary.delivery}
                </Typography>
              </Grid>
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
                  Rs. {summary.total}/-
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
                  isLoading={loading}
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

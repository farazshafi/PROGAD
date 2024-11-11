import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { cancelOrderApi, getOrderDetailsApi } from "../../api/orderApi";
import Header from "../Header/Header";
import BreadCrums from "../BreadCrums";
import OurButton from "../OurButton/OurButton";

const OrderDetailsCard = ({ isAdmin }) => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  let breadcrumbPath;
  if (isAdmin) {
    breadcrumbPath = [
      { label: "Admin Dashboard", url: "/admin_dashboard" },
      { label: order?.name, url: "/admin_dashboard" },
    ];
  }else{
    breadcrumbPath = [
      { label: "Home", url: "/" },
      { label: "Profile", url: "/profile" },
      { label: order?._id, url: "" },
    ];
  }
  const fetchOrderDetails = async () => {
    try {
      const result = await getOrderDetailsApi(id);
      console.log("result", result);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      setOrder(result.data);
    } catch (error) {
      toast.error("Failed to fetch order details.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      const result = await cancelOrderApi(order._id);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      toast.success(result.data.message);
      fetchOrderDetails();
    } catch (err) {
      toast.error("Failed to cancel order");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!order) return <Typography variant="h6">Order not found</Typography>;

  return (
    <>
      {!isAdmin && <Header />}
      <Box
        sx={{
          padding: "20px",
          minHeight: "100vh",
          backgroundColor: "#262626",
          color: "#fff",
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
          Order Details
        </Typography>
        <BreadCrums isAdmin={true} path={breadcrumbPath} />
        <Card
          sx={{
            padding: "20px",
            backgroundColor: "#333",
            color: "white",
            marginTop: "10px",
          }}
        >
          <Typography variant="h6">Order ID: {order._id}</Typography>
          <Divider sx={{ marginY: "10px", background: "white" }} />

          <Typography sx={{ marginBottom: "10px" }} variant="body1">
            <strong>Status:</strong>
            <span
              style={{
                marginLeft: "5px",
                padding: "3px",
                borderRadius: "5px",
                color:
                  order.status === "pending"
                    ? "black"
                    : order.status === "shipped"
                      ? "white"
                      : order.status === "delivered"
                        ? "black"
                        : order.status === "cancelled"
                          ? "white"
                          : "gray",
                backgroundColor:
                  order.status === "pending"
                    ? "yellow"
                    : order.status === "shipped"
                      ? "blue"
                      : order.status === "delivered"
                        ? "green"
                        : order.status === "cancelled"
                          ? "red"
                          : "gray",
              }}
            >
              {order.status}
            </span>
          </Typography>
          <Typography variant="body1">
            <strong>Order Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">
            <strong>Total:</strong> Rs. {order.totalPrice}
          </Typography>
          <Typography variant="body1">
            <strong>Payment Method:</strong> {order.paymentMethod}
          </Typography>

          <Divider sx={{ marginY: "10px", background: "white" }} />

          <Box>
            <Typography variant="h6">Items:</Typography>
            {order?.items?.map((item) => (
              <Grid
                container
                key={item.id._id}
                spacing={2}
                alignItems="center"
                sx={{ marginY: "10px" }}
              >
                <Grid item xs={2}>
                  <img
                    src={item.id.images[0]}
                    alt={item.id.name}
                    style={{
                      width: "80px",
                      height: "auto",
                      borderRadius: "5px",
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{item.id.name}</Typography>
                  <Typography variant="body2">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body2">Price: {item.price}</Typography>
                </Grid>

                <Grid item xs={4} textAlign="right">
                  <Typography variant="body1">
                    Subtotal: Rs. {item.subTotal}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Box>

          <Divider sx={{ marginY: "10px", background: "white" }} />

          <Box>
            <Typography variant="h6">Shipping Address:</Typography>
            <Typography variant="body1">
              {order?.shippingAddress?.street}, {order?.shippingAddress?.city},
              {order?.shippingAddress?.state}, {order?.shippingAddress?.zip},{" "}
              {order?.shippingAddress?.country}
            </Typography>
            <Typography variant="body1">
              Phone: {order?.shippingAddress?.phoneNumber}
            </Typography>
          </Box>
          {order.status === "pending" && (
            <div onClick={handleCancelOrder} style={{ marginTop: "20px" }}>
              <OurButton w={"100"} text={"Cancel Order"} />
            </div>
          )}
        </Card>
      </Box>
    </>
  );
};

export default OrderDetailsCard;

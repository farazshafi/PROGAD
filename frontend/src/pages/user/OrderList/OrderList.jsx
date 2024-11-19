import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { getAllOrdersApi } from "../../../api/orderApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../features/user/userSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";

const OrderList = () => {
  const user = useSelector(selectedUser);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await getAllOrdersApi(user._id);
        if (result.response) {
          const { status } = result.response;
          if (status === 400 || status === 500) {
            toast.error(result.response.data.message);
            return;
          }
        }
        setOrders(result.data);
      } catch (error) {
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        padding: "20px",
        minHeight: "100vh",
        backgroundColor: "#333",
        color: "#fff",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Your Orders
      </Typography>
      {orders?.length === 0 ? (
        <Typography variant="h6">No orders found.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: "#424242" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Delivery Status</TableCell>
                <TableCell sx={{ color: "#fff" }}>Payment</TableCell>
                <TableCell sx={{ color: "#fff" }}>Order Date</TableCell>
                <TableCell sx={{ color: "#fff" }}>Total Price</TableCell>
                <TableCell sx={{ color: "#fff" }}>Payment Method</TableCell>
                <TableCell sx={{ color: "#fff" }}>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order._id}>
                  <TableCell sx={{ color: "#fff" }}>
                    <span
                      style={{
                        padding: "10px",
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
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    <span
                      style={{
                        padding: "10px",
                        borderRadius: "5px",
                        color: "white",
                        backgroundColor:
                          order.paymentStatus === "unpaid"
                            ? "red"
                            : order.paymentStatus === "padi"
                              ? "green"
                              : order.paymentStatus === "refunded"
                                ? "blue"
                                : "gray",
                      }}
                    >
                      {order.paymentStatus}
                    </span>
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    ₹ {Number(order.totalPrice).toFixed(2)}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {order.paymentMethod}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => navigate(`/order_details/${order._id}`)}
                      color="primary"
                      sx={{ color: "#FF7F11" }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default OrderList;

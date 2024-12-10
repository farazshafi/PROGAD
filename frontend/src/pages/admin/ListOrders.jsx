import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Box,
  IconButton,
  Menu,
  Stack,
  Pagination,
} from "@mui/material";
import { IoMdMore } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  cancelOrderApi,
  listOrdersApi,
  updateOrderStatusApi,
} from "../../api/orderApi";
import {
  FaEye,
  FaTruck,
  FaBan,
  FaUndo,
  FaShippingFast,
  FaClock,
} from "react-icons/fa";

const ListOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const handleMenuClick = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleChangeStatus = async (status) => {
    if (selectedOrder) {
      try {
        const orderData = {
          status,
          user: selectedOrder.user._id,
        };
        const result = await updateOrderStatusApi(selectedOrder._id, orderData);
        if (result.response) {
          const { status } = result.response;
          if (status === 400 || status === 500) {
            toast.error(result.response.data.message);
            return;
          }
        }
        toast.success(result.data.message);
        handleMenuClose();
        fetchOrders();
      } catch (err) {
        toast.error("Failed to update order status. Please try again.");
        console.error("Update Order Status Error:", err);
      }
    }
  };

  const handleCancelOrder = async () => {
    try {
      const orderData = {
        status: "cancelled",
        user: selectedOrder.user._id,
      };
      const result = await updateOrderStatusApi(selectedOrder._id, orderData);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      toast.success("Order cancelled successfully");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to cancel order. Please try again.");
      console.error("Cancel Order Error:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await listOrdersApi(page);
      setOrders(data.allOrders);
      setTotalPages(data.totalPages);
    } catch (err) {
      toast.error("Failed to fetch orders. Please try again.");
      console.error("Fetch Orders Error:", err);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const filteredOrders = orders?.filter((order) => {
    const matchesStatus =
      selectedStatus === "All" || order.status === selectedStatus;
    const matchesSearch =
      order._id.includes(searchTerm) || order.user?.email?.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#1e1e2d", borderRadius: "8px" }}>
      <p className="text-4xl text-center text-white py-4">Order Management</p>

      {/* Filters */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        {/* Status Filter */}
        <Select
          value={selectedStatus}
          onChange={handleStatusChange}
          sx={{ backgroundColor: "#2c2c3a", color: "white" }}
        >
          <MenuItem value="All">All Status</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
          <MenuItem value="delivered">Delivered</MenuItem>
        </Select>

        {/* Search Filter */}
        <TextField
          variant="outlined"
          placeholder="Search by order ID or user ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: "#2c2c3a",
            borderRadius: 1,
            input: { color: "white" },
          }}
          InputLabelProps={{ style: { color: "white" } }}
        />
      </Box>

      {/* Orders Table */}
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1e1e2d", color: "white" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Order ID</TableCell>
              <TableCell sx={{ color: "white" }}>User</TableCell>
              <TableCell sx={{ color: "white" }}>Order Date</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Payment Status</TableCell>
              <TableCell sx={{ color: "white" }}>Total Price</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders?.map((order) => (
              <TableRow key={order._id}>
                <TableCell sx={{ color: "white" }}>{order?.orderId ? order.orderId : order._id}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {order?.user?.email}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {new Date(order.orderDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      color:
                        order.status === "returned"
                          ? "black"
                          : order.status === "pending"
                            ? "black"
                            : "white",
                      backgroundColor:
                        order.status === "pending"
                          ? "yellow"
                          : order.status === "shipped"
                            ? "blue"
                            : order.status === "delivered"
                              ? "green"
                              : order.status === "returned"
                                ? "white"
                                : order.status === "cancelled"
                                  ? "red"
                                  : "gray",
                    }}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      color: "white",
                      backgroundColor:
                        order.paymentStatus === "paid"
                          ? "green"
                          : order.paymentStatus === "unpaid"
                            ? "red"
                            : order.paymentStatus === "refunded"
                              ? "blue"
                              : "gray",
                    }}
                  >
                    {order.paymentStatus}
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  ₹{order.totalPrice.toFixed(2)}
                </TableCell>
                <TableCell>
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={(e) => handleMenuClick(e, order)}
                  >
                    <IoMdMore />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      onClick={() =>
                        navigate(
                          `/admin_dashboard/order_details/${selectedOrder.orderId}`
                        )
                      }
                    >
                      <FaEye style={{ marginRight: 8 }} /> View
                    </MenuItem>
                    <MenuItem
                      disabled={
                        selectedOrder?.status === "delivered" ||
                        selectedOrder?.status === "cancelled" ||
                        selectedOrder?.status === "returned"
                      }
                      onClick={() => handleChangeStatus("delivered")}
                    >
                      <FaTruck style={{ marginRight: 8 }} /> Mark as Delivered
                    </MenuItem>
                    <MenuItem
                      disabled={
                        selectedOrder?.status === "delivered" ||
                        selectedOrder?.status === "cancelled" ||
                        selectedOrder?.status === "returned"
                      }
                      onClick={() => handleChangeStatus("shipped")}
                    >
                      <FaShippingFast style={{ marginRight: 8 }} /> Mark as
                      Shipped
                    </MenuItem>
                    <MenuItem
                      disabled={
                        selectedOrder?.status === "delivered" ||
                        selectedOrder?.status === "cancelled" ||
                        selectedOrder?.status === "returned"
                      }
                      onClick={() => handleChangeStatus("pending")}
                    >
                      <FaClock style={{ marginRight: 8 }} /> Mark as Pending
                    </MenuItem>
                    <MenuItem
                      disabled={
                        selectedOrder?.status === "delivered" ||
                        selectedOrder?.status === "cancelled" ||
                        selectedOrder?.status === "returned"
                      }
                      onClick={handleCancelOrder}
                    >
                      <FaBan style={{ marginRight: 8 }} /> Mark as Cancelled
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} alignItems="center" marginTop={4}>
        <Pagination
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
            },
          }}
          count={totalPages}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
};

export default ListOrders;

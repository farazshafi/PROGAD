import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  Box,
  Card,
  Typography,
  Grid,
  Divider,
  CircularProgress,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  cancelOrderApi,
  getOrderDetailsApi,
  handleRazorpayApi,
  laterPaymentApi,
} from "../../api/orderApi";
import Header from "../Header/Header";
import BreadCrums from "../BreadCrums";
import OurButton from "../OurButton/OurButton";
import { useSelector } from "react-redux";
import { selectedUser } from "../../features/user/userSlice";
import { IoMdDownload } from "react-icons/io";

const OrderDetailsCard = ({ isAdmin }) => {
  const user = useSelector(selectedUser);
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isReturnEligible, setIsReturnEligible] = useState(false);
  const [status, setStatus] = useState("");

  const handleOpenDialog = (status) => {
    setStatus(status);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  let breadcrumbPath;
  if (isAdmin) {
    breadcrumbPath = [
      { label: "Admin Dashboard", url: "/admin_dashboard" },
      { label: order?.name, url: "/admin_dashboard" },
    ];
  } else {
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
      setIsReturnEligible(
        new Date() <=
          new Date(result?.data?.deliveredDate).setDate(
            new Date(result?.data?.deliveredDate).getDate() + 7
          )
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch order details.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (givenStatus) => {
    try {
      if (!cancelReason.trim()) {
        toast.error("Please provide a reason for cancellation.");
        return;
      }
      const result = await cancelOrderApi(order._id, {
        reason: cancelReason,
        status: givenStatus,
      });
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
    } finally {
      setOpenDialog(false);
    }
  };

  const handlePayment = async () => {
    try {
      const result = await handleRazorpayApi(
        order.totalPrice,
        user,
        order.shippingAddress
      );

      const orderData = {
        razorpayOrderId: result.razorpay_order_id,
        orderId: order._id,
      };

      const response = await laterPaymentApi(orderData);
      toast.success(response.message || "success");
      fetchOrderDetails();
    } catch (err) {
      toast.error("Failed to make payment");
      console.log(err);
    }
  };

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // Set text and line color to black
    doc.setTextColor(0, 0, 0); // Black text
    doc.setDrawColor(0, 0, 0); // Black lines

    // Add company name and invoice details
    doc.setFontSize(18);
    doc.text("PROGAD", 20, 20);
    doc.setFontSize(12);
    doc.text(`Invoice ID: ${order._id}`, 20, 30);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 20, 40);
    doc.text(`Order ID: ${order._id}`, 20, 50);
    doc.text(
      `Order Date: ${new Date(order.orderDate).toLocaleDateString()}`,
      20,
      60
    );
    doc.text(`Payment Method: ${order.paymentMethod}`, 20, 70);

    // Draw a line below the invoice header section
    doc.line(20, 75, 190, 75);

    // Shipping Address
    doc.text(`Shipping Address:`, 20, 85);
    doc.text(
      `${order.shippingAddress?.street}, ${order.shippingAddress?.city}`,
      20,
      95
    );
    doc.text(
      `${order.shippingAddress?.state}, ${order.shippingAddress?.zip}, ${order.shippingAddress?.country}`,
      20,
      105
    );

    // Draw a line after the shipping address section
    doc.line(20, 110, 190, 110);

    // Add item list (table) with column names and values
    doc.autoTable({
      head: [["Product Name", "Quantity", "Price", "Subtotal"]],
      body: order.items.map((item) => [
        item.id.name,
        item.quantity,
        `Rs.${item.price}`, // Use ₹ directly
        `Rs.${item.subTotal}`, // Use ₹ directly
      ]),
      startY: 120,
      theme: "striped", // You can use the striped theme for a clean look
      headStyles: {
        fillColor: [0, 0, 0], // White background for the header
        textColor: [255, 255, 255], // Black text for the header
        lineColor: [0, 0, 0], // Black lines for the header
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: [0, 0, 0], // Black text for body
        lineColor: [0, 0, 0], // Black lines for body
      },
    });

    // Draw a line after the table
    const tableBottomY = doc.lastAutoTable.finalY + 10;
    doc.line(20, tableBottomY, 190, tableBottomY);

    // Add total summary
    const totalY = tableBottomY + 10;
    doc.text(`Total Items: ${order.items.length}`, 20, totalY);
    doc.text(`Total Price: Rs. ${order.totalPrice}`, 20, totalY + 10); // Use ₹ directly

    // Draw a line after the total summary
    doc.line(20, totalY + 20, 190, totalY + 20);

    // Add thank you message
    doc.text("Thank you for shopping with PROGAD!", 20, totalY + 30);

    // Save the PDF as invoice
    doc.save(`${order._id}_Invoice.pdf`);
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
          <div className="flex justify-between">
            <p className="font-poppins text-xl mb-2">Order ID: {order._id}</p>
            <button
              onClick={handleDownloadInvoice}
              className="btn flex justify-between gap-1 bg-white text-black py-2 px-3 rounded hover:bg-gray-200"
            >
              <IoMdDownload className="mt-1" />
              Invoice
            </button>
          </div>
          <Divider sx={{ marginY: "10px", background: "white" }} />

          <Typography sx={{ marginBottom: "10px" }} variant="body1">
            <strong>Status:</strong>
            <span
              style={{
                marginLeft: "5px",
                padding: "3px",
                borderRadius: "5px",
                color: order.status === "returned" ? "black" : "white",
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
          </Typography>
          <Typography variant="body1">
            <strong>Order Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">
            <strong>Total:</strong> ₹ {order.totalPrice}
          </Typography>
          <Typography variant="body1">
            <strong>Payment Method:</strong> {order.paymentMethod}
          </Typography>
          <Typography
            sx={{ marginBottom: "10px", marginTop: "5px" }}
            variant="body1"
          >
            <strong>Payment Status:</strong>
            <span
              style={{
                marginLeft: "5px",
                padding: "3px 5px",
                borderRadius: "5px",
                color: "white",
                backgroundColor:
                  order.paymentStatus === "refunded"
                    ? "blue"
                    : order.paymentStatus === "paid"
                      ? "green"
                      : order.paymentStatus === "unpaid"
                        ? "red"
                        : "gray",
              }}
            >
              {order.paymentStatus}
            </span>
          </Typography>

          { !isAdmin && order.status !== "cancelled" &&
            order.paymentMethod === "razorpay" &&
            order.paymentStatus === "unpaid" && (
              <div>
                <button
                  onClick={handlePayment}
                  className="btn text-white font-poppins text-xl w-full my-2 bg-[#262626] hover:bg-slate-900"
                >
                  Pay Now
                </button>
              </div>
            )}

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
                    Subtotal: ₹ {item.subTotal}
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
          {!isAdmin && order.status === "pending" && (
            <div
              onClick={() => handleOpenDialog("Cancel")}
              style={{ marginTop: "20px" }}
            >
              <OurButton w={"100"} text={"Cancel Order"} />
            </div> 
          )}
          {!isAdmin && order.status === "delivered" && isReturnEligible && (
            <div
              onClick={() => handleOpenDialog("Return")}
              style={{ marginTop: "20px" }}
            >
              <OurButton w={"100"} text={"Return Product"} />
            </div>
          )}
        </Card>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <Typography variant="h6">
            Are you sure you want to {status} this order?
          </Typography>
          <TextField
            label={`Reason for ${status === "Return" ? "Returning" : "Cancellation"}`}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <button
            className="text-white py-2 px-3 rounded bg-black opacity-80"
            onClick={handleCloseDialog}
          >
            No
          </button>
          <button
            className="text-white py-2 px-3 rounded bg-[#ff7f11]"
            onClick={() => handleCancelOrder(status)}
          >
            Yes, Cancel
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderDetailsCard;

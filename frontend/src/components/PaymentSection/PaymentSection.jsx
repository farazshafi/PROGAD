import React, { useEffect, useState } from "react";
import {
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedOrder,
  setPaymentMethod,
} from "../../features/user/orderSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getWalletDetailsApi } from "../../api/walletApi";
import { selectedUser } from "../../features/user/userSlice";

const PaymentSection = () => {
  const orderDetails = useSelector(selectedOrder);
  const user = useSelector(selectedUser);
  const savedPayment = JSON.parse(localStorage.getItem("paymentMethod")) || ""

  const [payment, setPayment] = useState(savedPayment);
  const [walletDetails, setWalletDetails] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePaymentChange = (event) => {
    setPayment(event.target.value);
    dispatch(setPaymentMethod(event.target.value));
    navigate("/cart_process/place_order")
  };

  const fetchWalletDetails = async () => {
    try {
      const result = await getWalletDetailsApi(user._id);
      if (result.response) {
        const { status } = result.response;
        if (status === 500) {
          toast.error(result.response.data.message || "Cannot Fetch walledt");
          return;
        }
      }
      setWalletDetails(result);
    } catch (err) {
      toast.error("Server Error");
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    fetchWalletDetails();
    if (Object.keys(orderDetails?.shippingAddress).length === 0) {
      toast.error("Please select a shipping address");
      navigate("/cart_process/shipping");
      return;
    }
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#262626",
        padding: 3,
        borderRadius: 2,
        maxWidth: 600,
        margin: "0 auto",
        color: "#FFFF",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, color: "#fff" }}>
        Select Payment Method
      </Typography>
      <RadioGroup
        value={payment}
        onChange={handlePaymentChange}
        sx={{ color: "#FFF" }}
      >
        <FormControlLabel
          value="razorpay"
          control={<Radio sx={{ color: "#ffff" }} />}
          label="Razorpay"
        />
        {walletDetails && Number(walletDetails?.balance) > orderDetails.totalAmount && (
          <FormControlLabel
            value="wallet"
            control={<Radio sx={{ color: "#fff" }} />}
            label="Wallet"
            hidden={Number(walletDetails?.balance) < orderDetails.totalAmount}
          />
        )}
        <FormControlLabel
          value="cashOnDelivery"
          control={<Radio sx={{ color: "#fff" }} />}
          label="Cash on Delivery"
          hidden={Number(orderDetails.totalAmount) > 10000}
          sx={{
            color: Number(orderDetails.totalAmount) > 10000 ? "grey" : "white",
            "& .MuiFormControlLabel-label.Mui-disabled": { color: "grey" },
          }}
        />
      </RadioGroup>
    </Box>
  );
};

export default PaymentSection;

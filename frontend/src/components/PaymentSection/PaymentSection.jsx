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

const PaymentSection = () => {
  const orderDetails = useSelector(selectedOrder);

  const [payment, setPayment] = useState("razorpay");

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handlePaymentChange = (event) => {
    setPayment(event.target.value)
    dispatch(setPaymentMethod(event.target.value));
  };


  useEffect(()=>{
    if(Object.keys(orderDetails?.shippingAddress).length === 0){ 
      toast.error("Please select a shipping address")
      navigate("/cart_process/shipping")
      return
    }
  },[])

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

      {/* Place Order Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3, backgroundColor: "#FF7F11", color: "#FFF" }}
        onClick={()=>navigate("/cart_process/place_order")}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaymentSection;

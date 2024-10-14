import React, { useState } from "react";
import {
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
} from "@mui/material";

const PaymentSection = ({ address, onEditAddress }) => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

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
      {/* Payment Method Selection */}
      <Typography variant="h6" sx={{ marginBottom: 2, color: "#fff" }}>
        Select Payment Method
      </Typography>
      <RadioGroup
        value={paymentMethod}
        onChange={handlePaymentChange}
        sx={{ color: "#FFF" }}
      >
        <FormControlLabel
          value="creditCard"
          control={<Radio sx={{ color: "#fff" }} />}
          label="Credit Card"
        />
        <FormControlLabel
          value="paypal"
          control={<Radio sx={{ color: "#ffff" }} />}
          label="PayPal"
        />
        <FormControlLabel
          value="cashOnDelivery"
          control={<Radio sx={{ color: "#fff" }} />}
          label="Cash on Delivery"
        />
      </RadioGroup>

      {/* Display Selected Address */}
      

      {/* Place Order Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3, backgroundColor: "#FF7F11", color: "#FFF" }}
        onClick={() => alert("Order Placed!")}
      >
        Place Order
      </Button>
    </Box>
  );
};

export default PaymentSection;

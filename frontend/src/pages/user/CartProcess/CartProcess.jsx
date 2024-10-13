import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import Header from "../../../components/Header/Header";
import ShippingSection from "../../../components/ShippingSection/ShippingSection";
import PaymentSection from "../../../components/PaymentSection/PaymentSection";
import PlaceOrderSection from "../../../components/PlaceOrderSection/PlaceOrderSection";

const CartProcess = () => { 
  const [tabIndex, setTabIndex] = useState(0); // state for tab switching

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue); // updates the selected tab index
  };

  return (
    <>
      <Header navbar={false}/>
      <Box
        sx={{
          backgroundColor: "#262626",
          padding: 3, 
          borderRadius: 2,
          margin: "0 auto",
          color: "#FFFF",
        }}
      >
        {/* Tabs for switching between sections */}
        <Tabs
          sx={{ width: "100%" }}
          value={tabIndex} // Controlled by tabIndex state
          onChange={handleTabChange} // Handles tab change
          centered
          TabIndicatorProps={{
            style: { backgroundColor: "#FF7F11" },
          }}
        >
          <Tab
            label="Shipping address"
            sx={{
              // mx: 2,
              color: "#FFF",
              "&.Mui-selected": {
                color: "#FF7F11",
              },
            }}
          />
          <Tab
            label="Payment details"
            sx={{
              mx: 2,
              color: "#FFF",
              "&.Mui-selected": {
                color: "#FF7F11",
              },
            }}
          />
          <Tab
            label="Place order"
            sx={{
              mx: 2,
              color: "#FFF",
              "&.Mui-selected": {
                color: "#FF7F11",
              },
            }}
          />
        </Tabs>
        <Divider
          sx={{
            mt: "20px",
            mb: "10px",
            height: "1px",
            backgroundColor: "white",
          }}
        />

        {/* Conditionally Render Sections Based on the Selected Tab */}
        {tabIndex === 0 && <ShippingSection />} {/* Shows ShippingSection if tab 0 is selected */}
        {tabIndex === 1 && <PaymentSection />} {/* Shows PaymentSection if tab 1 is selected */}
        {tabIndex === 2 && <PlaceOrderSection />}
      </Box>
    </>
  );
};

export default CartProcess;

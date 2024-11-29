import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectedOrder, setShippingAddress } from "../../../features/user/orderSlice";
import { logoutUser, selectedUser } from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { selectedCart } from "../../../features/user/cartSlice";

const CartProcess = () => {
  const user = useSelector(selectedUser)
  const cartItems = useSelector(selectedCart)

  const [tabIndex, setTabIndex] = useState(0);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleSelectedAddress = (address) => {
    console.log("selected address" , address)
    dispatch(setShippingAddress(address))
    toast.success("Address saved")
  }

  useEffect(()=>{
    console.log(user)
    if(!user){
      toast.error("Please login to proceed")
      navigate("/login")
    }else{
      if(!user?.isVerified){
        toast.error("Please verify your email to proceed")
        dispatch(logoutUser())
        navigate("/login")
      }
    }
  },[])

  useEffect(() => {
    if(cartItems && cartItems.length < 1){
      navigate("/cart")
    }
  }, []);

  return (
    <>
      <Header/>
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
          value={tabIndex}
          onChange={handleTabChange}
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
        {tabIndex === 0 && <ShippingSection selectedAddress={handleSelectedAddress}/>} 
        {tabIndex === 1 && <PaymentSection />}
        {tabIndex === 2 && <PlaceOrderSection />}
      </Box>
    </>
  );
};

export default CartProcess;

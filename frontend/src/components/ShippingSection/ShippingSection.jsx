import React, { useEffect, useState } from "react";
import { TextField, Grid, Divider, Typography, Box } from "@mui/material";
import OurButton from "../OurButton/OurButton";
import AddressCard from "../AddressCard/AddressCard";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectedUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const ShippingSection = ({ selectedAddress }) => {
  const user = useSelector(selectedUser);

  const [address, setAddress] = useState({});

  const navigate = useNavigate();

  const handleAddressClick = (address) => {
    console.log("address clicked", address);
    if (Object.keys(address).length === 0) {
      return toast.error("Please select a address");
    }
    setAddress({
      id: address._id,
      type: address.type,
      name: address.name,
      phoneNumber: address.phoneNumber,
      city: address.city,
      email: address.email,
      apartment: address.apartment,
      address: address.address,
      country: address.country,
      state: address.state,
      street: address.street,
      zipCode: address.zip,
    });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (Object.keys(address).length !== 0) {
      selectedAddress(address);
    }
  }, [address]);

  return (
    <Box sx={{ padding: { sm: "0px 10px", lg: "0px 80px", xs: "0px 7px" } }}>
      <Typography variant="h6" sx={{ marginTop: 4, textAlign: "center" }}>
        SHIPPING ADDRESS
      </Typography>

      <AddressCard onAddressClick={handleAddressClick} />

      <Divider
        sx={{
          height: "1px",
          background: "white",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      />
      {Object.keys(address).length !==0  && (
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={address.name}
                margin="normal"
                InputProps={{
                  style: { color: "white" },
                  sx: {
                    "&.Mui-focused fieldset": {
                      borderColor: "#FF7F11",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "#FF7F11",
                    },
                    color: "#FF7F11",
                  },
                }}
                sx={{
                  backgroundColor: "white",
                  input: { color: "black" },
                  borderRadius: "10px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={address.phoneNumber}
                margin="normal"
                InputProps={{
                  style: { color: "white" },
                  sx: {
                    "&.Mui-focused fieldset": {
                      borderColor: "#FF7F11",
                    },
                    color: "#FF7F11",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "#FF7F11",
                    },
                    color: "#FF7F11",
                  },
                }}
                sx={{
                  backgroundColor: "white",
                  input: { color: "black" },
                  borderRadius: "10px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={address.email}
                margin="normal"
                InputProps={{
                  style: { color: "white" },
                  sx: {
                    "&.Mui-focused fieldset": {
                      borderColor: "#FF7F11",
                    },
                    color: "#FF7F11",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "#FF7F11",
                    },
                    color: "#FF7F11",
                  },
                }}
                sx={{
                  backgroundColor: "white",
                  input: { color: "black" },
                  borderRadius: "10px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                name="street"
                value={address.address}
                margin="normal"
                InputProps={{
                  style: { color: "white" },
                  sx: {
                    "&.Mui-focused fieldset": {
                      borderColor: "#FF7F11",
                    },
                    color: "#FF7F11",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "#FF7F11",
                    },
                    color: "#FF7F11",
                  },
                }}
                sx={{
                  backgroundColor: "white",
                  input: { color: "black" },
                  borderRadius: "10px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Street"
                name="street"
                value={address.street}
                margin="normal"
                InputProps={{
                  style: { color: "white" },
                  sx: {
                    "&.Mui-focused fieldset": {
                      borderColor: "#FF7F11",
                    },
                    color: "#FF7F11",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "#FF7F11",
                    },
                    color: "#FF7F11",
                  },
                }}
                sx={{
                  backgroundColor: "white",
                  input: { color: "black" },
                  borderRadius: "10px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={address.country}
                margin="normal"
                InputProps={{
                  style: { color: "white" },
                  sx: {
                    "&.Mui-focused fieldset": {
                      borderColor: "#FF7F11",
                    },
                    color: "#FF7F11",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "#FF7F11",
                    },
                    color: "#FF7F11",
                  },
                }}
                sx={{
                  backgroundColor: "white",
                  input: { color: "black" },
                  borderRadius: "10px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={address.state}
                margin="normal"
                InputProps={{
                  style: { color: "white" },
                  sx: {
                    "&.Mui-focused fieldset": {
                      borderColor: "#FF7F11",
                    },
                    color: "#FF7F11",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "#FF7F11",
                    },
                    color: "#FF7F11",
                  },
                }}
                sx={{
                  backgroundColor: "white",
                  input: { color: "black" },
                  borderRadius: "10px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ZIP Code"
                name="zipCode"
                value={address.zipCode}
                margin="normal"
                InputProps={{
                  style: { color: "white" },
                  sx: {
                    "&.Mui-focused fieldset": {
                      borderColor: "#FF7F11",
                    },
                    color: "#FF7F11",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "#FF7F11",
                    },
                    color: "#FF7F11",
                  },
                }}
                sx={{
                  backgroundColor: "white",
                  input: { color: "black" },
                  borderRadius: "10px",
                }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ mt: "20px" }} />
        </form>
      )}
    </Box>
  );
};

export default ShippingSection;

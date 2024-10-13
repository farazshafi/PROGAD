import React, { useState } from "react";
import {
  MenuItem,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import OurButton from "../OurButton/OurButton";

const ShippingSection = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    county: "",
    state: "",
    postalCode: "",
  });

  // Simulate previous addresses from the database
  const previousAddresses = [
    {
      id: 1,
      fullName: "John Doe",
      phoneNumber: "123456789",
      email: "john@example.com",
      addressLine1: "123 Main St",
      addressLine2: "Apt 4B",
      county: "Kings",
      state: "NY",
      postalCode: "11201",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      phoneNumber: "987654321",
      email: "jane@example.com",
      addressLine1: "456 Market St",
      addressLine2: "Suite 12",
      county: "Queens",
      state: "NY",
      postalCode: "11101",
    },
  ];

  const handleAddressSelect = (e) => {
    const selected = previousAddresses.find(
      (addr) => addr.id === e.target.value
    );
    setSelectedAddress(e.target.value);
    if (selected) {
      setAddress({
        fullName: selected.fullName,
        phoneNumber: selected.phoneNumber,
        email: selected.email,
        addressLine1: selected.addressLine1,
        addressLine2: selected.addressLine2,
        county: selected.county,
        state: selected.state,
        postalCode: selected.postalCode,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  return (
    <Box sx={{padding:{sm:"0px 10px",lg:"0px 80px",xs:"0px 7px"}}}>
      <Typography
        variant="h6"
        sx={{ marginTop: 4, marginBottom: 4, textAlign: "center" }}
      >
        SHIPPING ADDRESS
      </Typography>
      <FormControl sx={{ background: "white" }} fullWidth margin="normal">
        <InputLabel
          sx={{ background: "#FF7F11", color: "white" }}
          id="select-label"
        >
          Select Previous Address
        </InputLabel>
        <Select
          sx={{ background: "white" }}
          labelId="select-label"
          value={selectedAddress}
          onChange={handleAddressSelect}
          label="Select Previous Address"
        >
          {previousAddresses.map((addr) => (
            <MenuItem key={addr.id} value={addr.id}>
              {addr.fullName} - {addr.addressLine1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={address.fullName}
              onChange={handleInputChange}
              margin="normal"
              InputProps={{
                style: { color: "white" },
                // Change outline color on focus
                sx: {
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF7F11", // Change border color when focused
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  "&.Mui-focused": {
                    color: "#FF7F11",
                  },
                  color: "#FF7F11",
                  //   opacity:
                },
              }}
              sx={{
                backgroundColor: "white",
                input: { color: "black" },
                borderRadius: "10px", // Add border-radius
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={address.phoneNumber}
              onChange={handleInputChange}
              margin="normal"
              InputProps={{
                style: { color: "white" },
                sx: {
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF7F11",
                  },
                  color: "#FF7F11",
                  //   opacity:
                },
              }}
              InputLabelProps={{
                sx: {
                  "&.Mui-focused": {
                    color: "#FF7F11",
                  },
                  color: "#FF7F11",
                  //   opacity:
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
              onChange={handleInputChange}
              margin="normal"
              InputProps={{
                style: { color: "white" },
                sx: {
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF7F11",
                  },
                  color: "#FF7F11",
                  //   opacity:
                },
              }}
              InputLabelProps={{
                sx: {
                  "&.Mui-focused": {
                    color: "#FF7F11",
                  },
                  color: "#FF7F11",
                  //   opacity:
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
              label="Street Address/Address Line 1"
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleInputChange}
              margin="normal"
              InputProps={{
                style: { color: "white" },
                sx: {
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF7F11",
                  },
                  color: "#FF7F11",
                  //   opacity:
                },
              }}
              InputLabelProps={{
                sx: {
                  "&.Mui-focused": {
                    color: "#FF7F11",
                  },
                  color: "#FF7F11",
                  //   opacity:
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
              label="Address Line 2 (Optional)"
              name="addressLine2"
              value={address.addressLine2}
              onChange={handleInputChange}
              margin="normal"
              InputProps={{
                style: { color: "white" },
                sx: {
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF7F11",
                  },
                  color: "#FF7F11",
                  //   opacity:
                },
              }}
              InputLabelProps={{
                sx: {
                  "&.Mui-focused": {
                    color: "#FF7F11",
                  },
                  color: "#FF7F11",
                  //   opacity:
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
              label="County"
              name="county"
              value={address.county}
              onChange={handleInputChange}
              margin="normal"
              InputProps={{
                style: { color: "white" },
                sx: {
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF7F11",
                  },
                  color: "#FF7F11",
                  //   opacity:
                },
              }}
              InputLabelProps={{
                sx: {
                  "&.Mui-focused": {
                    color: "#FF7F11",
                  },
                  color: "#FF7F11",
                  //   opacity:
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
              label="State/Province/Region"
              name="state"
              value={address.state}
              onChange={handleInputChange}
              margin="normal"
              InputProps={{
                style: { color: "white" },
                sx: {
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF7F11",
                  },
                  color: "#FF7F11",
                  //   opacity:
                },
              }}
              InputLabelProps={{
                sx: {
                  "&.Mui-focused": {
                    color: "#FF7F11",
                  },
                  color: "#FF7F11",
                  //   opacity:
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
              label="Postal Code/ZIP Code"
              name="postalCode"
              value={address.postalCode}
              onChange={handleInputChange}
              margin="normal"
              InputProps={{
                style: { color: "white" },
                sx: {
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF7F11",
                  },
                  color: "#FF7F11",
                  //   opacity:
                },
              }}
              InputLabelProps={{
                sx: {
                  "&.Mui-focused": {
                    color: "#FF7F11",
                  },
                  color: "#FF7F11",
                  //   opacity:
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
        <OurButton text={"Save Address"} w={"100"} />
      </form>
    </Box>
  );
};

export default ShippingSection;

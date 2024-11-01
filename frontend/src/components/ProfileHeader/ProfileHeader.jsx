import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import {
  FaShoppingCart,
  FaHeart,
  FaLock,
  FaAddressCard,
  FaUser,
} from "react-icons/fa";
import UserProfileCard from "../UserProfileCard/UserProfileCard";
import { useSelector } from "react-redux";
import { selectedUser } from "../../features/user/userSlice";
import AddressCard from "../AddessCard/AddessCard";
import { toast } from "react-toastify";

const Input = styled("input")({
  display: "none",
});

const ProfileHeader = () => {
  const user = useSelector(selectedUser);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic
      console.log("File uploaded:", file);
    }
  };

  return (
  
    <Box
      sx={{
        backgroundColor: "#262626",
        color: "white",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      {/* Profile Section */}
      <Box
        sx={{
          paddingTop: "40px",
          position: "relative",
          backgroundColor: "white",
          borderRadius: "5px",
          padding: "70px 0px 0px 20px",
          marginBottom: "30px",
          justifyContent: "space-between",
        }}
        display="flex"
        alignItems="center"
        gap={2}
      >
        <Box sx={{ color: "black", display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              position: "relative",
              top: "20px",
              marginRight: "10px",
            }}
            src="/path/to/avatar.jpg"
            alt="Profile Picture"
          />
          <Box>
            <Typography variant="h5" color="black">
              {user?.name}
            </Typography>
            <Typography variant="subtitle1" color="black">
              {user?.email}
            </Typography>
          </Box>
        </Box>
        {/* Upload Button */}
        <label
          style={{ position: "absolute", top: 0, right: 0 }}
          htmlFor="profile-upload"
        >
          <Input
            accept="image/*"
            id="profile-upload"
            type="file"
            onChange={handleProfileUpload}
          />
          <IconButton
            sx={{ color: "black" }}
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </Box>

      {/* Tabs Section */}
      <Tabs
        style={{ justifyContent: "end" }}
        className="blah"
        value={tabIndex}
        onChange={handleTabChange}
        textColor="inherit"
        indicatorColor="primary"
        aria-label="profile tabs"
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          display: "flex",
          marginTop: 2,
          "& .MuiTabs-indicator": {
            backgroundColor: "#FF7F11",
          },
        }}
      >
        <Tab icon={<FaUser />} label="Details" />
        <Tab icon={<FaShoppingCart />} label="Orders" />
        <Tab icon={<FaAddressCard />} label="Address" />
        <Tab icon={<FaLock />} label="Reset Password" />
      </Tabs>

      {/* Content Section */}
      <Box mt={3}>
        {tabIndex === 0 && <UserProfileCard user={user} />}
        {tabIndex === 1 && (
          <Typography>Reset Password content goes here.</Typography>
        )}
        {tabIndex === 2 && <AddressCard />}
      </Box>
    </Box>
  );
};

export default ProfileHeader;

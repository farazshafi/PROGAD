import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
import { updatePasswordApi } from "../../../api/userApi";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../features/user/userSlice";

const ResetPassword = () => {
  const user = useSelector(selectedUser);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    userId : user._id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResetPassword = async () => {
    const { currentPassword, newPassword, confirmPassword, userId } = passwordData;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    
    if (currentPassword === newPassword) {
      toast.error("New password cannot be the same as current password.");
      return;
    }

    try {
      const result = await updatePasswordApi({
        currentPassword,
        newPassword,
        confirmPassword,
        userId
      });

      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      toast.success("Password updated successfully.");
      setPasswordData({
        ...passwordData,
        currentPassword:"",
        newPassword:"",
        confirmPassword:"",
      })
    } catch (error) {
      toast.error("Failed to update password.");
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        padding: 4,
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        borderRadius: "8px",
        margin: "0 auto",
        marginTop: "10vh",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Reset Password
      </Typography>

      <TextField
        type="password"
        label="Current Password"
        name="currentPassword"
        value={passwordData.currentPassword}
        onChange={handleInputChange}
        fullWidth
        sx={{
          backgroundColor: "#333",
          marginBottom: 2,
          "& .MuiInputBase-input": { color: "#fff" },
          "& .MuiInputLabel-root": { color: "#aaa" },
        }}
      />

      <TextField
        type="password"
        label="New Password"
        name="newPassword"
        value={passwordData.newPassword}
        onChange={handleInputChange}
        fullWidth
        sx={{
          backgroundColor: "#333",
          marginBottom: 2,
          "& .MuiInputBase-input": { color: "#fff" },
          "& .MuiInputLabel-root": { color: "#aaa" },
        }}
      />

      <TextField
        type="password"
        label="Confirm New Password"
        name="confirmPassword"
        value={passwordData.confirmPassword}
        onChange={handleInputChange}
        fullWidth
        sx={{
          backgroundColor: "#333",
          marginBottom: 3,
          "& .MuiInputBase-input": { color: "#fff" },
          "& .MuiInputLabel-root": { color: "#aaa" },
        }}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={handleResetPassword}
        sx={{
          backgroundColor: "#ff7f11",
          color: "#fff",
          "&:hover": { backgroundColor: "#ff9f32" },
        }}
      >
        Reset Password
      </Button>
    </Box>
  );
};

export default ResetPassword;

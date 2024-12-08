import React from "react";
import { Avatar, Box, Typography, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import { FaLock, FaAddressCard, FaUser, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectedUser } from "../../features/user/userSlice";
import OrderList from "../../pages/user/OrderList/OrderList";
import WalletPage from "../../pages/user/WalletPage";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import WishlistPage from "../../pages/user/WishlistPage";
import ResetPassword from "../../pages/user/ResetPasswordPage/ResetPasswordPage";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard"
import AddressCard from "../AddressCard/AddressCard";


const Input = styled("input")({
  display: "none",
});

const ProfileHeader = ({ component }) => {
  const user = useSelector(selectedUser);

  const navigate = useNavigate();

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic
    }
  };
  const handleClick = () => {
    //
  }

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
      <Box>
        <>
          <div className="border-b pb-2 border-gray-600">
            <ul className="flex flex-wrap -mb-px text-sm font-poppins text-center text-gray-100 dark:text-gray-400">
              <li>
                <button
                  className={`inline-flex items-center p-4 ${
                    component === "details"
                      ? "text-[#ff7f11] border-b-2 border-[#ff7f11]"
                      : ""
                  }`}
                  onClick={() => navigate("/profile/details")}
                >
                  <FaUser className="mr-2" />
                  Details
                </button>
              </li>
              <li>
                <button
                  className={`inline-flex items-center p-4 ${
                    component === "orders"
                      ? "text-[#ff7f11] border-b-2 border-[#ff7f11]"
                      : ""
                  }`}
                  onClick={() => navigate("/profile/orders")}
                >
                  <ShoppingCart className="mr-2" />
                  Orders
                </button>
              </li>
              <li>
                <button
                  className={`inline-flex items-center p-4 ${
                    component === "address"
                      ? "text-[#ff7f11] border-b-2 border-[#ff7f11]"
                      : ""
                  }`}
                  onClick={() => navigate("/profile/address")}
                >
                  <FaAddressCard className="mr-2" />
                  Address
                </button>
              </li>
              <li>
                <button
                  className={`inline-flex items-center p-4 ${
                    component === "wishlist"
                      ? "text-[#ff7f11] border-b-2 border-[#ff7f11]"
                      : ""
                  }`}
                  onClick={() => navigate("/profile/wishlist")}
                >
                  <FaHeart className="mr-2" />
                  Wishlist
                </button>
              </li>
              <li>
                <button
                  className={`inline-flex items-center p-4 ${
                    component === "wallet"
                      ? "text-[#ff7f11] border-b-2 border-[#ff7f11]"
                      : ""
                  }`}
                  onClick={() => navigate("/profile/wallet")}
                >
                  <FaWallet className="mr-2" />
                  Wallet
                </button>
              </li>
              <li>
                <button
                  className={`inline-flex items-center p-4 ${
                    component === "reset_password"
                      ? "text-[#ff7f11] border-b-2 border-[#ff7f11]"
                      : ""
                  }`}
                  onClick={() => navigate("/profile/reset_password")}
                >
                  <FaLock className="mr-2" />
                  Reset Password
                </button>
              </li>
            </ul>
          </div>
          {component === "details" && <UserProfileCard user={user}/>}
          {component === "orders" && <OrderList />}
          {component === "address" && <AddressCard onAddressClick={handleClick}/>}
          {component === "wallet" && <WalletPage />}
          {component === "wishlist" && <WishlistPage />}
          {component === "reset_password" && <ResetPassword />}
        </>
      </Box>
    </Box>
  );
};

export default ProfileHeader;

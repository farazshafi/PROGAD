import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Avatar,
  Modal,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { toast } from "react-toastify";
import { editUserApi } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { logoutUser, updateUser } from "../../features/user/userSlice";

const UserProfileCard = ({ user }) => {
  const dispatch = useDispatch();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name || "",
    email: user.email || "",
    city: user.city || "",
    country: user.country || "",
    phone: user.phone || "",
    userId: user._id,
  });

  const openModal = () => setIsEditModalOpen(true);
  const closeModal = () => setIsEditModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const result = await editUserApi(profileData);
    if (result.response) {
      const { status } = result.response;
      if (status === 400 || status === 500) {
        toast.error(result.response.data.message);
        return;
      }
    }
    toast.success("Profile updated successfully");
    dispatch(updateUser(profileData));
    setReRender(true);
    closeModal();
  };

  useEffect(() => {}, [reRender]);

  return (
    <>
      {user && (
        <>
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              width: "100%",
              maxWidth: 600,
              margin: "auto",
              padding: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: 2,
              }}
            >
              <Avatar
                alt="User Profile"
                src="/path/to/profile-image.jpg"
                sx={{ width: 100, height: 100 }}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  paddingLeft: "16px",
                }}
              >
                <Typography variant="h6">{user?.name}</Typography>
                <VerifiedIcon sx={{ color: "#ff7f11" }} />
              </Box>
              <CardContent>
                <Typography sx={{ marginTop: "5px" }} variant="body2">
                  Email: {user.email}
                </Typography>
                {user.phone && (
                  <Typography sx={{ marginTop: "5px" }} variant="body2">
                    Phone: {user.phone}
                  </Typography>
                )}
                {user.country && (
                  <Typography sx={{ marginTop: "5px" }} variant="body2">
                    Country: {user.country}
                  </Typography>
                )}
                {user.city && (
                  <>
                    <Typography sx={{ marginTop: "5px" }} variant="body2">
                      City: {user.city}
                    </Typography>
                  </>
                )}
                {user.phone && (
                  <Typography sx={{ marginTop: "5px" }} variant="body2">
                    Phone: {user.phone}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={openModal}
                  sx={{ backgroundColor: "#FF7F11" }}
                >
                  Edit Profile
                </Button>
                <Button onClick={()=> dispatch(logoutUser())} variant="contained" sx={{ backgroundColor: "#262626" }}>
                  Logout
                </Button>
              </CardActions>
            </Box>
          </Card>
          {/* modal */}
          <Modal
            open={isEditModalOpen}
            onClose={closeModal}
            aria-labelledby="edit-profile-modal"
          >
            <div
              style={{
                backgroundColor: "#1e1e1e",
                color: "#ffffff",
                padding: "20px",
                borderRadius: "8px",
                width: "400px",
                margin: "0 auto",
                marginTop: "10vh",
              }}
            >
              <h2>Edit Profile</h2>

              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                placeholder="Enter your new name"
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  padding: "8px",
                  borderRadius: "4px",
                  marginBottom: "10px",
                  width: "100%",
                }}
              />

              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                placeholder="Enter your new email"
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  padding: "8px",
                  borderRadius: "4px",
                  marginBottom: "10px",
                  width: "100%",
                }}
              />

              <label>City:</label>
              <input
                type="text"
                name="city"
                value={profileData.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  padding: "8px",
                  borderRadius: "4px",
                  marginBottom: "10px",
                  width: "100%",
                }}
              />

              <label>Country:</label>
              <input
                type="text"
                name="country"
                value={profileData.country}
                onChange={handleInputChange}
                placeholder="Enter your country"
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  padding: "8px",
                  borderRadius: "4px",
                  marginBottom: "10px",
                  width: "100%",
                }}
              />

              <label>Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  padding: "8px",
                  borderRadius: "4px",
                  marginBottom: "10px",
                  width: "100%",
                }}
              />

              <button
                onClick={handleSave}
                style={{
                  marginTop: "15px",
                  padding: "10px",
                  backgroundColor: "#ff7f11",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Save Changes
              </button>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default UserProfileCard;

import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Avatar,
  Breadcrumbs,
  Link,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";

const UserProfileCard = ({ user }) => {
  return (
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
            <VerifiedIcon color="primary" />
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
            {user.address && (
              <>
                <Typography sx={{ marginTop: "5px" }} variant="body2">
                  Country: India
                </Typography>

                <Typography sx={{ marginTop: "5px" }} variant="body2">
                  City: New York
                </Typography>
                <Typography sx={{ marginTop: "5px" }} variant="body2">
                  Address: 123 Main St
                </Typography>
              </>
            )}
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: "#FF7F11" }}
            >
              Edit Profile
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "#262626" }}>
              Logout
            </Button>
          </CardActions>
        </Box>
      </Card>
    </>
  );
};

export default UserProfileCard;

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { createAddressApi, getAllAddressesApi } from "../../api/addressApi";
import { useSelector, useDispatch } from "react-redux";
import { selectedUser, setAddress, setAllAddresses } from "../../features/user/userSlice";

const AddressCard = () => {
  const user = useSelector(selectedUser);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: "",
    street: "",
    apartmentNumber: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    email: "",
    default: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddAddress = async () => {
    const { street, city, state, zipCode, phone, country, type } = newAddress;

    if (
      !street.trim() ||
      !city.trim() ||
      !state.trim() ||
      !country.trim() ||
      !type
    ) {
      toast.error("All fields are required.");
      return;
    }

    if (!/^\d+$/.test(zipCode)) {
      toast.error("Zip code must be a number.");
      return;
    }

    if (!/^\+?\d+$/.test(phone)) {
      toast.error("Phone number must be numeric.");
      return;
    }

    try {
      console.log("new address: ", {
        ...newAddress,
        apartment: newAddress.apartmentNumber,
      });
      const result = await createAddressApi(user._id, newAddress);
      console.log("result :", result);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          console.log("Error fetching user address");
          toast.error(result.response.data.message);
          return;
        }
      }
      fetchAllUserAddresses()
      toast.success(result.data.message);
      handleClose(true);
    } catch (error) {
      toast.error(error);
      console.error("Error creating address:", error);
    }
  };

  const fetchAllUserAddresses = async () => {
    try {
      const result = await getAllAddressesApi(user._id);
      console.log("result", result.data)
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          console.log("Error fetching user address");
          toast.error(result.response.data.message);
          return;
        }
      }
      dispatch(setAllAddresses(result.data))
    } catch (err) {
      toast.error(err);
      console.error("Error fetching user addresses:", err);
    }
  };

  useEffect(() => {
    fetchAllUserAddresses();
  }, []);

  return (
    <>
      <Button sx={{ background: "white", color: "black" }} onClick={handleOpen}>
        Add Address
      </Button>

      {/* Modal for Creating Address */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            maxHeight: "80vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography id="modal-title" variant="h6">
              Add New Address
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            required
            label="Type"
            name="type"
            placeholder="Home"
            value={newAddress.type}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            required
            label="Street"
            name="street"
            placeholder="123 Main Street"
            value={newAddress.street}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            required
            label="Apartment Number"
            name="apartmentNumber"
            value={newAddress.apartmentNumber}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            required
            label="City"
            name="city"
            value={newAddress.city}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            required
            label="State"
            name="state"
            value={newAddress.state}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            required
            label="Zip Code"
            name="zipCode"
            type="number"
            value={newAddress.zipCode}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            required
            label="Country"
            name="country"
            value={newAddress.country}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            required
            label="Phone"
            name="phone"
            type="number"
            value={newAddress.phone}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            name="email"
            placeholder="optional"
            value={newAddress.email}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <Button
            onClick={handleAddAddress}
            variant="contained"
            sx={{ background: "black", color: "white", mt: 2 }}
            fullWidth
          >
            Add Address
          </Button>
        </Box>
      </Modal>
      
      {user.addresses && (
        <Grid sx={{ marginTop: "20px" }} container spacing={2}>
          {user.addresses.map((address) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={address.id}>
              <Card
                variant="outlined"
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  position: "relative",
                  background:
                    "radial-gradient(circle, rgba(255,200,152,1) 0%, rgba(255,127,17,1) 100%)",
                  color: "white",
                }}
              >
                <Box
                  position="absolute"
                  top={8}
                  right={8}
                  display="flex"
                  gap={1}
                >
                  <IconButton color="inherit" size="small" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="inherit" size="small" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {address.type} {address.default && "(Default)"}
                  </Typography>
                  <Typography variant="body2">{address.street}</Typography>
                  {address.apartmentNumber && (
                    <Typography variant="body2">
                      Apt/Suite: {address.apartmentNumber}
                    </Typography>
                  )}
                  <Typography variant="body2">
                    {address.city}, {address.state} {address.zipCode}
                  </Typography>
                  <Typography variant="body2">{address.country}</Typography>
                  <Typography variant="body2" mt={1}>
                    Phone: {address.phone}
                  </Typography>
                  <Typography variant="body2">
                    Email: {address.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default AddressCard;

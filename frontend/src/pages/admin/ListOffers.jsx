import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  IconButton,
  Menu,
  Divider,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
  Modal,
} from "@mui/material";
import { format } from "date-fns";
import { IoMdMore } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  deleteOfferApi,
  editOfferApi,
  getAllOffersAdminApi,
} from "../../api/offerApi"; // Assuming you have an API for offers

const ListOffers = () => {
  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showExpiredOnly, setShowExpiredOnly] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [expiredCount, setExpiredCount] = useState(0);
  const [offerData, setOfferData] = useState({
    status: "",
    discount: "",
    name: "",
    discountType: "percentage",
  });

  // Fetch offers data
  const fetchOffers = async () => {
    try {
      const offers = await getAllOffersAdminApi();
      console.log("offers :", offers.data);
      if (offers.response) {
        const { status } = offers.response;
        if (status === 400 || status === 500) {
          toast.error(offers.response?.data?.message);
          console.error(offers.response?.data?.message);
          return;
        }
      }
      setOffers(offers.data);
      const expired = offers.data.filter(
        (offer) => new Date(offer.expirationDate) < new Date()
      ).length;
      setExpiredCount(expired);
    } catch (err) {
      console.error("Error fetching offers:", err);
    }
  };

  const filteredOffers = offers?.filter((offer) => {
    const isExpired = new Date(offer.expirationDate) < new Date();
    const matchesSearch = offer.offerCode
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesExpired = !showExpiredOnly || isExpired;
    const matchesDate = selectedDate
      ? dayjs(offer.expirationDate).isSame(selectedDate, "day")
      : true;
    return matchesSearch && matchesExpired && matchesDate;
  });

  const handleMenuClick = (event, offer) => {
    setAnchorEl(event.currentTarget);
    setSelectedOffer(offer);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOffer(null);
  };

  const handleEdit = () => {
    setModalOpen(true);
    setOfferData({
      status: selectedOffer.status,
      discount: selectedOffer.discount,
      name: selectedOffer.name,
      discountType: selectedOffer.discountType,
    });
  };

  const handleInputChange = (e) => {
    setOfferData({
      ...offerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setModalOpen(false);
    try {
      const result = await editOfferApi(selectedOffer._id, offerData);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      toast.success(result.data.message);
      fetchOffers();
      handleClose();
    } catch (err) {
      console.error("Error updating offer:", err);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleExpiredClick = () => {
    setShowExpiredOnly((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteOfferApi(selectedOffer._id);
      console.log("result delete ", result);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      toast.success(result.data.message);
      fetchOffers();
      handleClose();
    } catch (err) {
      console.error("Error deleting offer:", err);
      toast.error("Error deleting offer.");
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <Box sx={{ padding: 3, backgroundColor: "#1e1e2d", borderRadius: "8px" }}>
        <p className="text-4xl text-center text-white py-4">Offer Management</p>
      <TextField
        variant="outlined"
        placeholder="Search by code"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          backgroundColor: "#2c2c3a",
          borderRadius: 1,
          input: { color: "white" },
          marginBottom: "10px",
        }}
        fullWidth
        mb={3}
      />
      <div className="flex justify-between">
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Filter by Expiry Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    backgroundColor: "#2c2c3a",
                    borderRadius: 1,
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                  fullWidth
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className="mt-[3px]">
          <Box
            onClick={handleExpiredClick}
            sx={{
              color: showExpiredOnly ? "white" : "grey",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            Expired
            <span
              className={`px-2 py-1 text-white rounded-sm ml-2 ${
                showExpiredOnly
                  ? "bg-red-500"
                  : "bg-rose-400"
              }`}
            >
              {expiredCount}
            </span>
          </Box>
        </div>
      </div>

      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1e1e2d", color: "white", marginTop: "10px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Code</TableCell>
              <TableCell sx={{ color: "white" }}>Discount</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Expiry Date</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOffers?.map((offer) => (
              <TableRow key={offer._id}>
                <TableCell sx={{ color: "white" }}>{offer.name}</TableCell>
                <TableCell sx={{ color: "white" }}>{offer.offerCode}</TableCell>
                {offer.discountType === "percentage" ? (
                  <TableCell sx={{ color: "white" }}>
                    {offer.discount}%
                  </TableCell>
                ) : (
                  <TableCell sx={{ color: "white" }}>
                    Rs. {offer.discount}
                  </TableCell>
                )}
                <TableCell sx={{ color: "white" }}>
                  <span
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      color: "white",
                      backgroundColor:
                        offer.status === "active" ? "green" : "red",
                    }}
                  >
                    {offer.status}
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {format(new Date(offer.expirationDate), "MMMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => handleMenuClick(e, offer)}
                    sx={{ color: "white" }}
                  >
                    <IoMdMore fontSize={"25px"} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl && selectedOffer === offer)}
                    onClose={handleClose}
                    sx={{ "& .MuiPaper-root": { backgroundColor: "white" } }}
                  >
                    <MenuItem
                      onClick={handleEdit}
                      sx={{ gap: "15px", color: "black" }}
                    >
                      <MdEdit fontSize={"25px"} /> Edit
                    </MenuItem>
                    <Divider sx={{ height: "1px", background: "grey" }} />
                    <MenuItem
                      onClick={handleDelete}
                      sx={{ gap: "15px", color: "black" }}
                    >
                      <FaTrash fontSize={"25px"} /> Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            backgroundColor: "black",
            padding: 3,
            width: 400,
            margin: "auto",
            marginTop: "10%",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <h2 className="mb-5 text-xl text-center">Edit Offer</h2>

          <TextField
            label="Offer Name"
            name="name"
            value={offerData.name}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: "10px" }}
            InputLabelProps={{ style: { color: "white" } }}
          />
          <TextField
            label="Discount"
            name="discount"
            value={offerData.discount}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: "10px" }}
            InputLabelProps={{ style: { color: "white" } }}
          />
          <FormControl fullWidth sx={{ marginBottom: "10px" }}>
            <InputLabel sx={{ color: "white" }}>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={offerData.status}
              onChange={handleInputChange}
              sx={{ color: "white", backgroundColor: "#2c2c3a" }}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ marginTop: "10px" }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ListOffers;

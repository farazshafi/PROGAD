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
import {
  deleteCouponApi,
  editCouponApi,
  getAllCouponsApi,
} from "../../api/couponApi";
import { toast } from "react-toastify";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const ListCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showExpiredOnly, setShowExpiredOnly] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [couponData, setCouponData] = useState({
    status: "",
    discount: "",
    code: "",
    minPurchasePrice: "",
  });

  const fetchCoupons = async () => {
    try {
      const coupons = await getAllCouponsApi();
      console.log("coupons da", coupons);
      if (coupons.response) {
        const { status } = coupons.response;
        if (status === 400 || status === 500) {
          toast.error(coupons.response?.data?.message);
          console.error(coupons.response?.data?.message);
          return;
        }
      }
      setCoupons(coupons.data);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    }
  };

  const filteredCoupons = coupons.filter((coupon) => {
    const isExpired = new Date(coupon.expirationDate) < new Date();
    const matchesSearch = coupon.code
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesExpired = !showExpiredOnly || isExpired;
    const matchesDate = selectedDate
      ? dayjs(coupon.expirationDate).isSame(selectedDate, "day")
      : true;
    return matchesSearch && matchesExpired && matchesDate;
  });

  const handleMenuClick = (event, coupon) => {
    setAnchorEl(event.currentTarget);
    setSelectedCoupon(coupon);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCoupon(null);
  };

  const handleEdit = () => {
    setModalOpen(true);
    setCouponData({
      status: selectedCoupon.status,
      discount: selectedCoupon.discount,
      code: selectedCoupon.code,
      minPurchasePrice: selectedCoupon.minPurchasePrice,
    });
  };

  const handleInputChange = (e) => {
    setCouponData({
      ...couponData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setModalOpen(false);
    try {
      console.log("new data", couponData);
      const result = await editCouponApi(selectedCoupon._id, couponData);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      toast.success(result.data.message);
      fetchCoupons();
      handleClose();
    } catch (err) {
      console.error("Error updating coupon:", err);
      return;
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteCouponApi(selectedCoupon._id);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      toast.success(result.data.message);
      fetchCoupons();
    } catch (err) {
      console.error("Error deleting coupon:", err);
    }
    handleClose();
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <Box sx={{ padding: 3, backgroundColor: "#1e1e2d", borderRadius: "8px" }}>
      <p className="text-4xl text-center text-white py-4">Coupon Management</p>

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

      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1e1e2d", color: "white", marginTop: "10px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Code</TableCell>
              <TableCell sx={{ color: "white" }}>Discount</TableCell>
              <TableCell sx={{ color: "white" }}>Limit</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Expiry Date</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCoupons.map((coupon) => (
              <TableRow key={coupon._id}>
                <TableCell sx={{ color: "white" }}>{coupon.code}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {coupon.discount}%
                </TableCell>
                <TableCell sx={{ color: "white" }}>{coupon.limit}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  <span
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      color: "white",
                      backgroundColor:
                        coupon.status === "active" ? "green" : "red",
                    }}
                  >
                    {coupon.status}
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {format(new Date(coupon.expirationDate), "MMMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => handleMenuClick(e, coupon)}
                    sx={{ color: "white" }}
                  >
                    <IoMdMore fontSize={"25px"} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl && selectedCoupon === coupon)}
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
          <h2 className="mb-5 text-xl text-center">Edit Coupon</h2>

          <TextField
            label="Code"
            value={couponData.code}
            onChange={handleInputChange}
            name="code"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Discount"
            value={couponData.discount}
            onChange={handleInputChange}
            name="discount"
            type="number"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Min Purchase"
            value={couponData.minPurchasePrice}
            onChange={handleInputChange}
            name="minPurchasePrice"
            type="number"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={couponData.status}
              onChange={handleInputChange}
              name="status"
              label="Status"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ListCoupons;

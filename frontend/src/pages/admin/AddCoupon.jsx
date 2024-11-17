import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Select, InputLabel, FormControl } from "@mui/material";
import { toast } from "react-toastify";
import { createCouponApi } from "../../api/couponApi";
import dayjs from "dayjs";
import { getPublishedCategoriesApi } from "../../api/categoryApi";

const AddCoupon = () => {
  const [categories, setCategories] = useState([]);

  const [coupon, setCoupon] = useState({
    name: "",
    code: "",
    discount: "",
    expirationDate: null,
    limit: "",
    minPurchasePrice: "",
    status: "active",
    categories: [],
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoupon((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    const selectedDate = dayjs(date);
    const today = dayjs();

    if (selectedDate.isBefore(today, "day")) {
      toast.error("Expiration date cannot be before today");
      return;
    }
    setCoupon((prev) => ({ ...prev, expirationDate: date }));
  };

  const handleCategoryChange = (e, categoryId) => {
    if (e.target.checked) {
      setCoupon((prev) => ({
        ...prev,
        categories: [...prev.categories, categoryId],
      }));
    } else {
      setCoupon((prev) => ({
        ...prev,
        categories: prev.categories.filter((id) => id !== categoryId),
      }));
    }
  };

  const handleShowCouponDetails = async () => {
    console.log("coupons category", coupon.categories);
    try {
      console.log("coupon", coupon);
      if (
        !coupon.name ||
        !coupon.code ||
        !coupon.discount ||
        !coupon.limit ||
        !coupon.minPurchasePrice
      ) {
        toast.error("All fields are required");
        return;
      }
      if (Number(coupon.discount > 70)) {
        return toast.error(" discount must be less than 70%");
      }

      const today = dayjs();
      const selectedDate = dayjs(coupon.expirationDate);
      if (!coupon.expirationDate || selectedDate.isBefore(today, "day")) {
        toast.error("Expiration date cannot be in the past.");
        return;
      }

      const newCategories = coupon.categories;
      const couponWithDate = {
        ...coupon,
        expirationDate: dayjs(coupon.expirationDate).toDate(),
        categories: newCategories,
      };
      const result = await createCouponApi(couponWithDate);
      console.log("result coupon ", result);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(
            result.response.data.message || result.response.statusText
          );
          return;
        }
      }
      toast.success(result.data.message);
      setCoupon({
        name: "",
        code: "",
        discount: "",
        expirationDate: null,
        limit: "",
        minPurchasePrice: "",
        status: "active",
        categories: [],
        description: "",
      });
    } catch (err) {
      toast.error(err);
      console.error("Error fetching coupon details:", err);
    }
    return;
  };

  const fetchCategories = async () => {
    try {
      const result = await getPublishedCategoriesApi();
      console.log("categor result", result);
      setCategories(result);
    } catch (err) {
      toast.error(err);
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6 bg-gray-800 text-white rounded-md max-w-lg mx-auto mt-10 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Coupon</h2>

      {/* Line 1: Coupon Name & Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <TextField
          label="Coupon Name"
          variant="outlined"
          name="name"
          fullWidth
          value={coupon.name}
          onChange={handleInputChange}
          className="bg-gray-900 text-white"
          InputLabelProps={{ style: { color: "white" } }}
        />
        <TextField
          label="Coupon Code"
          variant="outlined"
          name="code"
          fullWidth
          value={coupon.code}
          onChange={handleInputChange}
          className="bg-gray-900 text-white"
          InputLabelProps={{ style: { color: "white" } }}
        />
      </div>

      {/* Line 2: Discount & Expiration Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <TextField
          label="Discount (%)"
          variant="outlined"
          name="discount"
          fullWidth
          value={coupon.discount}
          onChange={handleInputChange}
          className="bg-gray-900 text-white"
          InputLabelProps={{ style: { color: "white" } }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Expiration Date"
            value={coupon.expirationDate}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                fullWidth
                className="bg-gray-900 text-white"
                InputLabelProps={{ style: { color: "white" } }}
              />
            )}
          />
        </LocalizationProvider>
      </div>

      {/* Line 3: Limit & Minimum Purchase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <TextField
          label="Limit"
          variant="outlined"
          name="limit"
          fullWidth
          value={coupon.limit}
          onChange={handleInputChange}
          className="bg-gray-900 text-white"
          InputLabelProps={{ style: { color: "white" } }}
        />
        <TextField
          label="Minimum Purchase Value"
          variant="outlined"
          name="minPurchasePrice"
          fullWidth
          value={coupon.minPurchasePrice}
          onChange={handleInputChange}
          className="bg-gray-900 text-white"
          InputLabelProps={{ style: { color: "white" } }}
        />
      </div>

      {/* Line 4: Status & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormControl fullWidth className="bg-gray-900">
          <InputLabel style={{ color: "white" }}>Status</InputLabel>
          <Select
            name="status"
            value={coupon.status}
            onChange={handleInputChange}
            style={{ color: "white", backgroundColor: "#1f2937" }}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="deactive">Deactive</MenuItem>
          </Select>
        </FormControl>

        <div className="flex flex-col">
          <span className="text-white mb-2">Categories:</span>
          {categories.map((category) => (
            <FormControlLabel
              key={category._id}
              control={
                <Checkbox
                  checked={coupon.categories?.includes(category._id)}
                  onChange={(e) => handleCategoryChange(e, category._id)}
                  style={{ color: "white" }}
                />
              }
              label={category.name}
              className="text-white"
            />
          ))}
        </div>
      </div>

      {/* Line 5: Full Description */}
      <div className="mb-4">
        <TextField
          label="Full Description"
          variant="outlined"
          name="description"
          fullWidth
          multiline
          rows={4}
          value={coupon.description}
          onChange={handleInputChange}
          className="bg-gray-900 text-white"
          InputLabelProps={{ style: { color: "white" } }}
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleShowCouponDetails}
        className="bg-white hover:bg-gray-700 text-black"
      >
        Create Coupon
      </Button>
    </div>
  );
};

export default AddCoupon;

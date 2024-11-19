import React, { useEffect, useState } from "react";
import {
  TextField,
  Switch,
  FormControlLabel,
  Button,
  MenuItem,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import {
  getAllProductsApi,
  getAllPublicProductsForAdminApi,
} from "../../api/productApi";
import { getPublishedCategoriesApi } from "../../api/categoryApi";
import { createOfferApi } from "../../api/offerApi";

const AddOffer = () => {
  const [offerDetails, setOfferDetails] = useState({
    name: "",
    offerCode: "",
    expirationDate: null,
    status: "active",
    discountType: "percentage",
    applyToProducts: false,
    applyToCategories: false,
    discount: "",
    productIds: [],
    categoryIds: [],
  });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setOfferDetails((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProductChange = (event) => {
    const { value } = event.target;
    setOfferDetails((prevState) => ({
      ...prevState,
      productIds: typeof value === "string" ? value.split(",") : value,
    }));
  };

  // Submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    // validation
    if (offerDetails.name.trim() === "" || offerDetails.name.length < 2) {
      toast.error("Offer name is required.");
      return;
    }
    if (offerDetails.offerCode.trim() === "") {
      toast.error("Offer code is required.");
      return;
    }
    if (offerDetails.expirationDate === null) {
      toast.error("Expiration date is required.");
      return;
    }
    if(Number(offerDetails.discount > 70)){
      toast.error("Discount must be less than 70%");
      return;
    }
    if (
      offerDetails.discountType === "percentage" &&
      offerDetails.discount === ""
    ) {
      toast.error("Discount percentage is required.");
      return;
    }
    if (offerDetails.applyToProducts && offerDetails.productIds.length === 0) {
      toast.error("Please select products for this offer.");
      return;
    }
    if (
      offerDetails.applyToCategories &&
      offerDetails.categoryIds.length === 0
    ) {
      toast.error("Please select categories for this offer.");
      return;
    }

    const selectedDate = dayjs(offerDetails.expirationDate);
    const todayDate = dayjs();
    if (selectedDate.isBefore(todayDate, "day")) {
      toast.error("Expiration date cannot set to past.");
      return;
    }

    try {
      const result = await createOfferApi(offerDetails);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      toast.success("Offer created!");
      setOfferDetails({
        name: "",
        offerCode: "",
        expirationDate: null,
        status: "active",
        discountType: "percentage",
        applyToProducts: false,
        applyToCategories: false,
        discount: "",
        productIds: [],
        categoryIds: [],
      });
    } catch (err) {
      toast.error("Failed to add offer. Please try again.");
      console.log(err);
    }
    console.log(offerDetails);
  };

  const fetchAllProducts = async () => {
    try {
      const result = await getAllPublicProductsForAdminApi();
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      setProducts(result.data);
    } catch (err) {
      toast.error("Error When fetching Products");
      console.log(err);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const result = await getPublishedCategoriesApi();
      console.log("categoriess : ", result);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      setCategories(result);
    } catch (err) {
      toast.error("Error When fetching Products");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    fetchAllCategories();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        style={{
          backgroundColor: "#2c2c2c",
          color: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <p className="text-2xl text-center mt-2 font-semibold">Create Offer</p>
        <form onSubmit={handleSubmit}>
          {/* Name and Offer Code */}
          <TextField
            label="Offer Name"
            name="name"
            value={offerDetails.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            style={{ backgroundColor: "#444", color: "#ffffff" }}
          />
          <TextField
            label="Offer Code"
            name="offerCode"
            value={offerDetails.offerCode}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            style={{ backgroundColor: "#444", color: "#ffffff" }}
          />

          {/* Date Picker for Expiration Date */}
          <DatePicker
            label="Expiration Date"
            value={
              offerDetails.expirationDate
                ? dayjs(offerDetails.expirationDate)
                : null
            }
            onChange={(date) =>
              setOfferDetails((prevState) => ({
                ...prevState,
                expirationDate: date ? dayjs(date).toISOString() : null,
              }))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                fullWidth
                InputLabelProps={{ style: { color: "#ffffff" } }}
                style={{ backgroundColor: "#444", color: "#ffffff" }}
              />
            )}
          />

          {/* Status Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={offerDetails.status}
              onChange={handleChange}
              label="Status"
              style={{ backgroundColor: "#444", color: "#ffffff" }}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <div className="block">
            {/* Discount Type Switch */}
            <div className="block">
              <FormControlLabel
                control={
                  <Switch
                    checked={offerDetails.discountType === "percentage"}
                    onChange={() =>
                      setOfferDetails((prevState) => ({
                        ...prevState,
                        discountType:
                          prevState.discountType === "percentage"
                            ? "fixed"
                            : "percentage",
                      }))
                    }
                  />
                }
                label={`Discount Type: ${offerDetails.discountType === "percentage" ? "Percentage" : "Fixed Price"}`}
              />
            </div>
            {/* Apply to Products Switch */}
            <div className="block">
              <FormControlLabel
                control={
                  <Switch
                    checked={offerDetails.applyToProducts}
                    onChange={() =>
                      setOfferDetails((prevState) => ({
                        ...prevState,
                        applyToProducts: !prevState.applyToProducts,
                      }))
                    }
                    name="applyToProducts"
                  />
                }
                label="Apply to Products"
              />
            </div>

            {/* Apply to Categories Switch */}
            <div className="block">
              <FormControlLabel
                control={
                  <Switch
                    checked={offerDetails.applyToCategories}
                    onChange={() =>
                      setOfferDetails((prevState) => ({
                        ...prevState,
                        applyToCategories: !prevState.applyToCategories,
                      }))
                    }
                    name="applyToCategories"
                  />
                }
                label="Apply to Categories"
              />
            </div>
          </div>

          {/* Discount Input */}
          <TextField
            label="Discount"
            name="discount"
            type="number"
            value={offerDetails.discount}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            style={{ backgroundColor: "#444", color: "#ffffff" }}
          />

          {/* Product Selection (shown if applyToProducts is true) */}
          {offerDetails.applyToProducts && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Products</InputLabel>
              <Select
                multiple
                value={offerDetails.productIds}
                onChange={handleProductChange}
                input={<OutlinedInput label="Products" />}
                renderValue={(selected) =>
                  selected
                    .map(
                      (id) =>
                        products.find((product) => product._id === id)?.name
                    )
                    .join(", ")
                }
                style={{ backgroundColor: "#444", color: "#ffffff" }}
              >
                {products.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    <Checkbox
                      checked={offerDetails.productIds.includes(product._id)}
                    />
                    <ListItemText primary={product.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Category Selection (shown if applyToCategories is true) */}
          {offerDetails.applyToCategories && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Categories</InputLabel>
              <Select
                multiple
                value={offerDetails.categoryIds}
                onChange={(event) =>
                  setOfferDetails((prevState) => ({
                    ...prevState,
                    categoryIds: event.target.value,
                  }))
                }
                input={<OutlinedInput label="Categories" />}
                renderValue={(selected) =>
                  selected
                    .map(
                      (id) =>
                        categories.find((category) => category._id === id)?.name
                    )
                    .join(", ")
                }
                style={{ backgroundColor: "#444", color: "#ffffff" }}
              >
                {categories?.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    <Checkbox
                      checked={offerDetails.categoryIds.includes(category._id)}
                    />
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Submit Button */}
          <Button
            className="mt-4 w-full bg-white"
            variant="contained"
            type="submit"
          >
            Submit Offer
          </Button>
        </form>
      </div>
    </LocalizationProvider>
  );
};

export default AddOffer;

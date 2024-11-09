import React, { useState } from "react";
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

const AddOffer = () => {
  // State management for form fields
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

  // Mock data for products and categories
  const products = [
    { id: "prod1", name: "Product 1" },
    { id: "prod2", name: "Product 2" },
    { id: "prod3", name: "Product 3" },
  ];

  const categories = [
    { id: "cat1", name: "Category 1" },
    { id: "cat2", name: "Category 2" },
    { id: "cat3", name: "Category 3" },
  ];

  // Handler for input changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setOfferDetails((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handler for multiple selection (productIds)
  const handleProductChange = (event) => {
    const { value } = event.target;
    setOfferDetails((prevState) => ({
      ...prevState,
      productIds: typeof value === "string" ? value.split(",") : value,
    }));
  };

  // Submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add submit logic here
    console.log(offerDetails);
  };

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
        <h2>Create Offer</h2>
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
                        products.find((product) => product.id === id)?.name
                    )
                    .join(", ")
                }
                style={{ backgroundColor: "#444", color: "#ffffff" }}
              >
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    <Checkbox
                      checked={offerDetails.productIds.includes(product.id)}
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
                        categories.find((category) => category.id === id)?.name
                    )
                    .join(", ")
                }
                style={{ backgroundColor: "#444", color: "#ffffff" }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    <Checkbox
                      checked={offerDetails.categoryIds.includes(category.id)}
                    />
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Submit Button */}
          <Button className="mt-4 w-full bg-white" variant="contained" type="submit">
            Submit Offer
          </Button>
        </form>
      </div>
    </LocalizationProvider>
  );
};

export default AddOffer;

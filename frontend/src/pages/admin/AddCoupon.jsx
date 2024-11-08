import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Select, InputLabel, FormControl } from '@mui/material';

const categories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Fashion' },
  { id: 3, name: 'Groceries' },
  { id: 4, name: 'Books' },
  { id: 5, name: 'Toys' }
];

const AddCoupon = () => {
  const [coupon, setCoupon] = useState({
    name: '',
    code: '',
    discount: '',
    expirationDate: null,
    limit: '',
    minPurchase: '',
    status: 'active',
    categories: [],
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoupon((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setCoupon((prev) => ({ ...prev, expirationDate: date }));
  };

  const handleCategoryChange = (categoryId) => {
    setCoupon((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  const handleShowCouponDetails = () => {
    alert(JSON.stringify(coupon, null, 2));
    console.log("coupon details",coupon)
    return
  };

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
          InputLabelProps={{ style: { color: 'white' } }}
        />
        <TextField
          label="Coupon Code"
          variant="outlined"
          name="code"
          fullWidth
          value={coupon.code}
          onChange={handleInputChange}
          className="bg-gray-900 text-white"
          InputLabelProps={{ style: { color: 'white' } }}
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
          InputLabelProps={{ style: { color: 'white' } }}
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
                InputLabelProps={{ style: { color: 'white' } }}
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
          InputLabelProps={{ style: { color: 'white' } }}
        />
        <TextField
          label="Minimum Purchase Value"
          variant="outlined"
          name="minPurchase"
          fullWidth
          value={coupon.minPurchase}
          onChange={handleInputChange}
          className="bg-gray-900 text-white"
          InputLabelProps={{ style: { color: 'white' } }}
        />
      </div>

      {/* Line 4: Status & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormControl fullWidth className="bg-gray-900">
          <InputLabel style={{ color: 'white' }}>Status</InputLabel>
          <Select
            name="status"
            value={coupon.status}
            onChange={handleInputChange}
            style={{ color: 'white', backgroundColor: '#1f2937' }}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="deactive">Deactive</MenuItem>
          </Select>
        </FormControl>

        <div className="flex flex-col">
          <span className="text-white mb-2">Categories:</span>
          {categories.map((category) => (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  checked={coupon.categories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  style={{ color: 'white' }}
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
          InputLabelProps={{ style: { color: 'white' } }}
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

import React, { useEffect, useState } from "react";
import {
  Drawer,
  TextField,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  FormGroup,
  Slider,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { getPublishedCategoriesApi } from "../../api/categoryApi";

const FilterSideBar = ({ isOpen, toggleSidebar, onFilterChange }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });

  const handleCategoryChange = (event) => {
    const { checked, value } = event.target;
    setCategories((prevCategories) =>
      checked
        ? [...prevCategories, value]
        : prevCategories.filter((categoryId) => categoryId !== value)
    );
  };

  const handlePriceRangeChange = (event) => {
    const value = event.target.value;
    if (value === "all") setPriceRange({ min: 0, max: 50000 });
    if (value === "upto10k") setPriceRange({ min: 0, max: 10000 });
    if (value === "10kto20k") setPriceRange({ min: 10000, max: 20000 });
    if (value === "morethan20k") setPriceRange({ min: 20000, max: 50000 });
    if (value === "custom") setPriceRange({ ...priceRange });
  };

  const fetchCategories = async () => {
    try {
      const result = await getPublishedCategoriesApi();
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      console.log("result category: ", result);
      setAllCategories(result);
    } catch (err) {
      console.error("Error fetching categories:", err);
      toast.error("Error fetching categories");
    }
  };

  // Handle custom slider range
  const handleSliderChange = (event, newValue) => {
    setPriceRange({ min: newValue[0], max: newValue[1] });
  };

  // Apply filters when the sidebar closes or updates
  const applyFilters = () => {
    onFilterChange({ categories, priceRange });
    toggleSidebar(); // Close sidebar after applying filters
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Drawer
      open={isOpen}
      onClose={toggleSidebar}
      variant="persistent"
      anchor="left"
    >
      <div style={{ width: 250, padding: "1rem", textAlign: "center" }}>
        <IconButton
          onClick={toggleSidebar}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            fontFamily: "'Istok Web', sans-serif",
            fontSize: "25px",
            fontWeight: 700,
          }}
        >
          Filter
        </Typography>
        <TextField label="Search" variant="outlined" fullWidth />

        {/* Categories Section */}
        <Typography sx={{ mb: "20px", mt: "30px" }} variant="h6" gutterBottom>
          Categories
        </Typography>
        <FormGroup>
          {allCategories?.map((category) => (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  value={category._id}
                  onChange={handleCategoryChange}
                />
              }
              label={category.name}
            />
          ))}
        </FormGroup>

        <Divider sx={{ border: "1px solid black", mt: "10px", mb: "20px" }} />

        {/* Price Range Section */}
        <Typography variant="h6" gutterBottom>
          Price in range
        </Typography>
        <RadioGroup onChange={handlePriceRangeChange}>
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel
            value="upto10k"
            control={<Radio />}
            label="Up to ₹10K"
          />
          <FormControlLabel
            value="10kto20k"
            control={<Radio />}
            label="₹10K to ₹20K"
          />
          <FormControlLabel
            value="morethan20k"
            control={<Radio />}
            label="More than ₹20K"
          />
          <FormControlLabel value="custom" control={<Radio />} label="Custom" />
        </RadioGroup>

        {/* Custom Slider for Price Range */}
        <Slider
          value={[priceRange.min, priceRange.max]}
          onChange={handleSliderChange}
          min={0}
          max={50000}
          step={5000}
          valueLabelDisplay="auto"
          sx={{ mt: "5px" }}
        />

        <Divider sx={{ border: "1px solid black", mt: "10px", mb: "20px" }} />

        {/* Apply Filters Button */}
        <button
          onClick={applyFilters}
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#FF7F11",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Apply Filters
        </button>
      </div>
    </Drawer>
  );
};

export default FilterSideBar;

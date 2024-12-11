import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import ProductDescription from "../ProductDescription/ProductDescription.js/ProductDescription";
import ProductReviews from "../ProductReviews/ProductReviews";

const ProductInformation = ({ product }) => {
  const [value, setValue] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTotalReviews = (total) => {
    setTotalReviews(total);
  };

  return (
    <>
      {Object.keys(product).length > 0 && (
        <Box
          sx={{ backgroundColor: "#262626", color: "#fff", padding: "20px" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{ marginBottom: "20px", borderBottom: "1px solid #fff" }}
          >
            <Tab
              label="Description"
              sx={{
                color: "#fff",
                fontFamily: "iStock, Arial, sans-serif", // Apply the custom font
                fontSize: "16px", // Adjust the size if necessary
              }}
            />
            <Tab
              label={`Reviews ${totalReviews === 0 ? "" : "(" + totalReviews + ")"}`}
              sx={{
                color: "#fff",
                fontFamily: "iStock, Arial, sans-serif", // Apply the custom font
                fontSize: "16px",
              }}
            />
          </Tabs>

          {/* Tab Panel for Description */}
          {value === 0 && (
            <Box sx={{ padding: "10px" }}>
              <ProductDescription description={product.description} />
            </Box>
          )}

          {/* Tab Panel for Reviews */}
          {value === 1 && (
            <Box sx={{ padding: "10px" }}>
              <ProductReviews
                totalReviews={handleTotalReviews}
                id={product._id}
                
              />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default ProductInformation;

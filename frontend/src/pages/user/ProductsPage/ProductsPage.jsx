import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import FilterSideBar from "../../../components/FilterSideBar/FilterSideBar";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { Button, Typography } from "@mui/material";
import { getAllProductsApi } from "../../../api/productApi";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  setProducts,
} from "../../../features/product/productSlice";
import { toast } from "react-toastify";

const ProductsPage = () => {
  const products = useSelector(selectedProduct);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const fetchProducts = async () => {
    try {
      const { data } = await getAllProductsApi();
      if (data.response) {
        console.log(data.response)
        const { status } = data.response;
        if (status === 400 || status === 500) {
          toast.error(data.response.data.message || "An error occurred");
        }
      } else {
        dispatch(setProducts(data));
      }
    } catch (error) {
      toast.error("Failed to fetch products. Please try again.");
      console.error("Fetch Products Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <FilterSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Flexbox container for aligning button to the right */}
      <Typography
        sx={{
          color: "white",
          fontFamily: "Istok Web",
          textAlign: "center",
          fontWeight: 400,
          fontSize: { xs: "22px", md: "28px", sm: "25px", lg: "30px" },
          marginBottom: "50px",
        }}
      >
        Find Your Perfect Match
      </Typography>

      <div style={{ padding: "10px 50px", marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <Button
            size="small"
            sx={{ backgroundColor: "#FF7F11" }}
            variant="contained"
            onClick={toggleSidebar}
          >
            <Typography>{isSidebarOpen ? "Close" : "Filter"}</Typography>
          </Button>
        </div>
      </div>

      <ProductCard page={"products"} />
      <Footer />
    </React.Fragment>
  );
};

export default ProductsPage;

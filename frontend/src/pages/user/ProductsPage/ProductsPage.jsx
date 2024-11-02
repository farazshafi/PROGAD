import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import FilterSideBar from "../../../components/FilterSideBar/FilterSideBar";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { Breadcrumbs, Button, Link, Typography } from "@mui/material";
import { getAllProductsApi } from "../../../api/productApi";
import { useDispatch, useSelector } from "react-redux";
import {Link as RouterLink} from "react-router-dom"
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
      {/* Breadcrumbs Section */}
      <div role="presentation">
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ color: "white", padding: "0 5%" }}
        >
          {/* Home Breadcrumb */}
          <Link underline="hover" color="white" component={RouterLink} to="/">
            Home
          </Link>

          <Link
            underline="hover"
            color="white"
            component={RouterLink}
            to="/products"
          >
            Products
          </Link>
        </Breadcrumbs>
      </div>

      <FilterSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Flexbox container for aligning button to the right */}
      

      <div style={{ padding: "10px 50px", marginBottom: "10px" }}>
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

      <Typography
        sx={{
          color: "white",
          fontFamily: "Poppins",
          textAlign: "center",
          fontWeight: 400,
          fontSize: { xs: "22px", md: "28px", sm: "25px", lg: "30px" },
          marginBottom: "50px",
        }}
      >
        Find Your Perfect Match
      </Typography>

      <ProductCard page={"products"} />
      <Footer />
    </React.Fragment>
  );
};

export default ProductsPage;

import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import FilterSideBar from "../../../components/FilterSideBar/FilterSideBar";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { Button, Typography } from "@mui/material";

const ProductsPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

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
          fontSize: {xs:"22px",md:"28px",sm:"25px",lg:"30px"},
          marginBottom: "50px",
        }}
      >
        Find Your Perfect Match
      </Typography>

      <div style={{padding:"10px 50px",marginBottom:"20px"}}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end", 
            marginBottom: "20px"
          }}
        >
          <Button size="small" sx={{backgroundColor:"#FF7F11"}} variant="contained" onClick={toggleSidebar}>
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

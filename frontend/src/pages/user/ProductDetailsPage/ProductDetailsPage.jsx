import React from "react";
import ProductDetail from "../../../components/ProductDetail/ProductDetail";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { Divider } from "@mui/material";
import ProductInformation from "../../../components/ProductInformation/ProductInformation";

const ProductDetailsPage = () => {
  return (
    <>
      <Header />
      <ProductDetail />
      <Divider sx={{backgroundColor:"#ffff", height:"1px"}}/> 
      <ProductInformation />
      <Footer />
    </>
  );
};

export default ProductDetailsPage;

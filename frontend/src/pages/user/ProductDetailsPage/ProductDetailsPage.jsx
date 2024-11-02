import React, { useEffect, useState } from "react";
import ProductDetail from "../../../components/ProductDetail/ProductDetail";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { Breadcrumbs, Divider, Link, Typography } from "@mui/material";
import ProductInformation from "../../../components/ProductInformation/ProductInformation";
import { useParams, Link as RouterLink } from "react-router-dom"; // Import Link from react-router-dom for navigation
import { toast } from "react-toastify";
import { getProductDetailsApi } from "../../../api/productApi";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const { id } = params;

  const fetchProductDetails = async () => {
    try {
      const result = await getProductDetailsApi(id);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(
            result.response?.data?.message || "Error while getting product details"
          );
        }
      } else {
        setProduct(result.data);
      }
    } catch (err) {
      console.log("Error while getting product details", err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <>
      <Header />

      {/* Breadcrumbs Section */}
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white', padding:"0 5%" }}>
          {/* Home Breadcrumb */}
          <Link
            underline="hover"
            color="white"
            component={RouterLink}
            to="/"
          >
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

          {/* Product Details Breadcrumb */}
          <Typography color="white">{product.name}</Typography>
        </Breadcrumbs>
      </div>

      <ProductDetail product={product} />
      <Divider sx={{ backgroundColor: "#ffff", height: "1px" }} />
      <ProductInformation product={product} />
      <Footer />
    </>
  );
};

export default ProductDetailsPage;

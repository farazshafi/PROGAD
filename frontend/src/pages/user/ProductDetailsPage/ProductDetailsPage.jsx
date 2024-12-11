import React, { useEffect, useState } from "react";
import ProductDetail from "../../../components/ProductDetail/ProductDetail";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import {
  Breadcrumbs,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Link,
  Rating,
  Typography,
} from "@mui/material";
import ProductInformation from "../../../components/ProductInformation/ProductInformation";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom"; // Import Link from react-router-dom for navigation
import { toast } from "react-toastify";
import {
  getProductDetailsApi,
  getRelatedProductApi,
} from "../../../api/productApi";
import ProductCard from "../../../components/ProductCard/ProductCard";
import OurButton from "../../../components/OurButton/OurButton";
import { Col, Container, Row } from "react-bootstrap";
import BreadCrums from "../../../components/BreadCrums";
import { useSelector } from "react-redux";
import { selectedFetchProduct } from "../../../features/product/productSlice";

const ProductDetailsPage = () => {
  const fetchPro = useSelector(selectedFetchProduct)

  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  const breadcrumbPath = [
    { label: "Home", url: "/" },
    { label: "Products", url: "/products" },
    { label: product?.name, url: "" },
  ];

  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const fetchProductDetails = async () => {
    try {
      const result = await getProductDetailsApi(id);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(
            result.response?.data?.message ||
              "Error while getting product details"
          );
        }
      } else {
        setProduct(result.data);
        fetchRelatedProducts(result.data?.category?._id);
      }
    } catch (err) {
      console.log("Error while getting product details", err);
      toast.error(err.message);
    }
  };

  const fetchRelatedProducts = async (categoryId) => {
    try {
      const result = await getRelatedProductApi(categoryId);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      setRelatedProduct(result.data);
    } catch (err) {
      console.log("Error while fetching related products", err);
      toast.error(err.message);
    }
  };

  // const handleNavigate = (id) => {
  //   navigate(`/product_details/${id}`); 
  // };

  useEffect(() => {
    fetchProductDetails();
  }, [fetchPro]);

  return (
    <>
      <Header />

      {/* Breadcrumbs Section */}
      <BreadCrums path={breadcrumbPath}/>
      <ProductDetail product={product} />
      <Divider sx={{ backgroundColor: "#ffff", height: "1px" }} />
      <ProductInformation product={product} />
      <Footer />
    </>
  );
};

export default ProductDetailsPage;

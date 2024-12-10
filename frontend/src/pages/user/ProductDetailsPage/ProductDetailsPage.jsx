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

const ProductDetailsPage = () => {
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
  }, []);

  return (
    <>
      <Header />

      {/* Breadcrumbs Section */}
      <BreadCrums path={breadcrumbPath}/>

      <ProductDetail product={product} />
      <Divider sx={{ backgroundColor: "#ffff", height: "1px" }} />
      <ProductInformation product={product} />
      <Container>
        {/* <Row>
          {relatedProduct.length > 0 ? (
            relatedProduct.map((product, i) => (
              <Col key={i} className="mb-5" xs={6} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345, backgroundColor: "transparent" }}>
                  <CardActionArea>
                    <CardMedia
                      onClick={handleNavigate(product._id)}
                      component="img"
                      height="140"
                      image={product.images[0]}
                      alt="Sony headphone"
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Rating
                        sx={{ color: "#FF7F11" }}
                        name={"wow"}
                        defaultValue={3.5}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                      <Typography
                        sx={{
                          color: "#fff",
                          fontFamily: "Istok Web",
                          fontSize: {
                            xs: "15px",
                            sm: "16px",
                            md: "18px",
                            lg: "20px",
                          },
                        }}
                        variant="h6"
                        component="div"
                      >
                        {product.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>

                  <CardActions sx={{ justifyContent: "center", gap: "10px" }}>
                    <OurButton
                      type={"rupees"}
                      text={String(
                        product.hasVariants
                          ? product.variants[0].discountPrice
                          : product.discountPrice
                      )}
                    />
                    <Typography
                      sx={{
                        fontSize: { sm: "5px", md: "1px", lg: "20PX" },
                        fontFamily: "Istok Web",
                        textDecoration: "line-through",
                        marginLeft: 2,
                        color: "white",
                      }}
                    >
                      {product.hasVariants
                        ? product.variants[0].originalPrice
                        : product.originalPrice}
                    </Typography>
                  </CardActions>
                </Card>
              </Col>
            ))
          ) : (
            <div style={{ textAlign: "center" }}>
              <h2 style={{ color: "white" }}>No Related Product Found</h2>
            </div>
          )}
        </Row> */}
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;

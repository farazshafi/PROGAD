import React, { useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { Row, Col, Container } from "react-bootstrap";
import sonyImg from "../../assets/images/products/sony.jpeg";
import OurButton from "../OurButton/OurButton";
import { useSelector } from "react-redux";
import { selectedProduct } from "../../features/product/productSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ page }) => {
  const products = useSelector(selectedProduct);

  const navigate = useNavigate();

  const handleNavigate = (productId) => () => {
    navigate(`/product_details/${productId}`);
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          {products.length > 0 ? (
            products.map((product, i) => (
              <Col
                key={i}
                className="mb-5"
                xs={6}
                sm={6}
                md={4}
                lg={page === "products" ? 3 : 3}
              >
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
              <h2 style={{ color: "white" }}>No Products Found</h2>
            </div>
          )}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ProductCard;

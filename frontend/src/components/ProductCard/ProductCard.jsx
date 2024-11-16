import React, { useState } from "react";
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
import OurButton from "../OurButton/OurButton";
import { useSelector } from "react-redux";
import { selectedProduct } from "../../features/product/productSlice";
import { selectedUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { createWishlistApi } from "../../api/wishlistApi";

const ProductCard = ({ page }) => {
  const user = useSelector(selectedUser);
  const products = useSelector(selectedProduct);
  const navigate = useNavigate();

  // State to manage the visibility of the heart icon on hover
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const handleNavigate = (productId) => () => {
    navigate(`/product_details/${productId}`);
  };

  const handleAddToWishlist = async (id) => {
    if (!user) {
      toast.warning("Please Login to add to wishlist");
      return;
    }
    try {
      const result = await createWishlistApi({
        userId: user._id,
        productId: id,
      });
      console.log("wishlist result : ", result);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      toast.success(result.data.message);
    } catch (err) {
      toast.error("Failed when adding to whishlist");
      console.log(err);
    }
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
                <Card
                  sx={{
                    maxWidth: 345,
                    backgroundColor: "transparent",
                    position: "relative",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                  onMouseEnter={() => setHoveredProductId(product._id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  {hoveredProductId === product._id && (
                    <FaHeart
                      onClick={() => handleAddToWishlist(product._id)}
                      className="text-black text-3xl absolute top-3 right-3 cursor-pointer z-10"
                    />
                  )}

                  <CardActionArea>
                    <CardMedia
                      onClick={handleNavigate(product._id)}
                      component="img"
                      height="140"
                      image={product.image}
                      alt="Product Image"
                    />
                    {product.discount && (
                      <div className="text-white absolute top-3 left-3 z-1 bg-black p-1 px-2 text-sm font-semibold skew-x-[-17deg] skew-y-0 rounded-md">
                        {product.discountType === "percentage"
                          ? product.discount
                          : "₹-" + product.discount}
                      </div>
                    )}
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
                      text={Number(
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

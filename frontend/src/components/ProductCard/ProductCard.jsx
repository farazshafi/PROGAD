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
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct } from "../../features/product/productSlice";
import { selectedUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { createWishlistApi } from "../../api/wishlistApi";
import { addToCart } from "../../features/user/cartSlice";

const ProductCard = ({ page }) => {
  const user = useSelector(selectedUser);
  const products = useSelector(selectedProduct);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: Number(product.discountPrice),
      quantity: 1,
      image: product.image,
      stock: product.stock,
      subTotal: Number(product.discountPrice) * 1,
      category: product.category,
    };

    dispatch(addToCart(cartItem));
    toast.success("Product added to cart");
    // setShowAddToCartAnimation(true);
    // setTimeout(() => setShowAddToCartAnimation(false), 2300);
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
                      isRupees={true}
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
                      ₹{product.hasVariants
                        ? product.variants[0].originalPrice
                        : product.originalPrice}
                    </Typography>
                  </CardActions>
                  <div className="mt-2 py-3 px-2">
                    {product.stock < 1 ? (
                      <button
                        disabled
                        onClick={() => handleAddToCart(product)}
                        className="text-red-600 font-poppins w-full bg-gray-300 rounded p-2"
                      >
                        Out of Stock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="text-black font-poppins w-full bg-white hover:bg-gray-400 rounded p-2"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
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

import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./ProductDetail.css";
import { Divider, Rating, Typography } from "@mui/material";
import OurButton from "../OurButton/OurButton";
import QtyCounterInput from "../QtyCounterInput/QtyCounterInput";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/user/cartSlice";
import addedTOcartAnimation from "../../assets/animations/addToCart.json";
import Lottie from "lottie-react";

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const [showAddToCartAnimation, setShowAddToCartAnimation] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: Number(product.discountPrice),
      quantity: quantity,
      image: product.images[0],
      stock: product.totalStock,
      subTotal: Number(product.discountPrice * quantity,)
    };
    dispatch(addToCart(cartItem));
    setShowAddToCartAnimation(true);
    setTimeout(() => setShowAddToCartAnimation(false), 2300);
    setQuantity(1);
  };

  return (
    <>
      {showAddToCartAnimation && (
        <div className="animation-overlay">
          <Lottie
            animationData={addedTOcartAnimation}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "white",
              borderRadius: "15%",
              padding: "20px",
            }}
            autoPlay={true}
          />
        </div>
      )}

      {Object.keys(product).length > 0 && (
        <div className="product-details-container">
          <Row className="rows">
            <Col className="multi-images" xs={3} sm={2} lg={1}>
              {product?.images &&
                product.images.map((img, i) => (
                  <div className="image-div" key={i}>
                    <Zoom>
                      <img
                        src={img}
                        alt={`Product image ${i + 1}`}
                        width="100%"
                        style={{ cursor: "pointer" }}
                      />
                    </Zoom>
                  </div>
                ))}
            </Col>

            <Col className="product-img-col" xs={9} sm={10} lg={5}>
              <div className="product-img-div">
                <img src={product.images[0]} alt="" />
              </div>
            </Col>
            <Col className="product-details-col" xs={12} sm={12} lg={5}>
              <div className="details-box">
                <Typography
                  sx={{
                    color: "white",
                    fontFamily: "Istok Web",
                    fontWeight: "800",
                    fontSize: { lg: "20px", xs: "15px", sm: "15px" },
                    mb: "5px",
                  }}
                >
                  Brand Name
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontFamily: "Istok Web",
                    fontWeight: "800",
                    fontSize: { lg: "30px", xs: "18px", sm: "20px" },
                    mb: "10px",
                  }}
                >
                  {product.name}
                </Typography>
                <div>
                  {product.discount && (
                    <div className="bg-white w-fit px-2 py-1 rounded mb-2">
                      <p className=" text-black text-xl">
                        Offer -
                        {product.discountType === "percentage"
                          ? product.discount + "%"
                          : "₹" + product.discount}
                      </p>
                    </div>
                  )}
                </div>
                <div className="product-details-price-div">
                  <Typography
                    sx={{
                      color: "#FF7F11",
                      fontFamily: "Istok Web",
                      fontWeight: "800",
                      fontSize: { lg: "20px", xs: "15px", sm: "15px" },
                      mb: "5px",
                    }}
                  >
                    <i
                      style={{ marginTop: "3px", marginRight: "3px" }}
                      className="fa-solid fa-indian-rupee-sign"
                    ></i>
                    {product.discountPrice}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#ffff",
                      opacity: 0.5,
                      fontFamily: "Istok Web",
                      fontSize: { lg: "18px", xs: "12px", sm: "12px" },
                      mb: "5px",
                      textDecoration: "line-through",
                    }}
                  >
                    {product.originalPrice}
                  </Typography>
                </div>
                <Divider sx={{ height: "1px", backgroundColor: "white" }} />
                <div className="rating-box">
                  <Rating
                    name="read-only"
                    value={4}
                    readOnly
                    sx={{
                      "& .MuiRating-iconFilled": {
                        color: "#FF7F11",
                      },
                      "& .MuiRating-iconEmpty": {
                        color: "white",
                      },
                      marginTop: "20px",
                    }}
                  />
                  <Typography
                    sx={{
                      color: "white",
                      fontFamily: "Istok Web",
                      marginLeft: "5px",
                      marginTop: "22px",
                    }}
                  >
                    16
                  </Typography>
                </div>
                <Typography
                  sx={{
                    color: "white",
                    fontFamily: "Istok Web",
                    mt: { xs: "20px", lg: "10px" },
                  }}
                >
                  {product.description}
                </Typography>
                <Divider
                  sx={{
                    backgroundColor: "white",
                    marginTop: { lg: "20px", xs: "20px" },
                    marginBottom: { lg: "20px", xs: "20px" },
                  }}
                ></Divider>
                {/* if in stock */}
                {product.totalStock > 1 ? (
                  <>
                    <div className="stock-management-is">
                      <Typography
                        sx={{ color: "white", fontFamily: "Istok Web" }}
                      >
                        In Stock
                      </Typography>
                    </div>
                  </>
                ) : (
                  <div className="stock-management-os">
                    <Typography
                      sx={{ color: "white", fontFamily: "Istok Web" }}
                    >
                      Out of Stock
                    </Typography>
                  </div>
                )}
                {product.hasVariants && (
                  <>
                    <Typography
                      sx={{ color: "white", fontFamily: "Istok Web" }}
                    >
                      Select Variant
                    </Typography>
                    <div className="variants-div">
                      <div
                        style={{ backgroundColor: "red" }}
                        className="variant"
                      ></div>
                      <div
                        style={{ backgroundColor: "black" }}
                        className="variant"
                      ></div>
                      <div
                        style={{ backgroundColor: "white" }}
                        className="variant"
                      ></div>
                    </div>
                  </>
                )}
                <div className="action-button">
                  <div style={{ width: "100%" }}>
                    <QtyCounterInput
                      value={quantity}
                      onChange={handleQuantityChange}
                      stock={product.totalStock}
                    />
                  </div>
                  <div
                    onClick={() => handleAddToCart(product)}
                    style={{ width: "100%" }}
                  >
                    <OurButton
                      disabled={product.totalStock < 1 ? true : false}
                      page={"product_details"}
                      text={"Add To Cart"}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductDetail;

import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import headphoneImg from "../../../assets/images/products/headphone.jpeg";
import { Box, Typography } from "@mui/material";
import "./CartPage.css";
import { Col, Row } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import OurButton from "../../../components/OurButton/OurButton";

const CartPage = () => {
  const [items] = useState([
    {
      id: 1,
      name: "Apple iPhone 15 (Black, 128 GB)",
      price: 79000,
      quantity: 3,
      image: headphoneImg,
    },
    {
      id: 2,
      name: "Apple iPhone 15 (Black, 128 GB)",
      price: 79000,
      quantity: 3,
      image: headphoneImg,
    },
    {
      id: 3,
      name: "Apple iPhone 15 (Black, 128 GB)",
      price: 79000,
      quantity: 3,
      image: headphoneImg,
    },
    {
      id: 4,
      name: "Apple iPhone 15 (Black, 128 GB)",
      price: 79000,
      quantity: 3,
      image: headphoneImg,
    },
  ]);

  return (
    <>
      <Header />
      <Box className="cart-container">
        <Typography
          sx={{
            fontFamily: "Istok Web",
            fontSize: "30px",
            fontWeight: "700",
            color: "white",
          }}
        >
          Your shopping cart (4)
        </Typography>
        <Row style={{ marginTop: "30px" }}>
          {/* cart items */}
          <Col sm={12} md={6} lg={8}>
            {items.map((item) => (
              <Row key={item.id} style={{ marginBottom: "20px" }}>
                <Col lg={2} md={2} sm={2}>
                  <div
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "100px",
                    }}
                    className="cart-item-img"
                  />
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <Typography
                    sx={{
                      color: "white",
                      fontFamily: "Istok Web",
                      fontSize: "20px",
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontFamily: "Istok Web",
                      fontSize: "15px",
                      textAlign: "center",
                    }}
                  >
                    Product description and other information, like color and model name
                  </Typography>
                </Col>
                <Col lg={1} md={1} sm={1}>
                  <div className="cart-item-qty-div">
                    <button>-</button>
                    <Typography sx={{ color: "white" }}>{item.quantity}</Typography>
                    <button>+</button>
                  </div>
                </Col>
                <Col lg={3} md={3} sm={3}>
                  <div
                    className="cart-item-price_remove"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Istok Web",
                        fontWeight: "700",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      Rs. {item.price.toLocaleString()}
                    </Typography>
                    <DeleteIcon sx={{ color: "white", marginLeft: "20px", cursor: "pointer" }} />
                  </div>
                </Col>
              </Row>
            ))}
          </Col>

          {/* product summary details */}
          <Col
            style={{
              backgroundColor: "#333",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            {/* Coupon Input Section */}
            <div
              className="cart-coupoun"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <input
                type="text"
                placeholder="Enter coupon code"
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  marginRight: "10px",
                  fontSize: "16px",
                }}
              />
              <OurButton text="Apply" />
            </div>

            {/* Price Summary Section */}
            <div
              className="cart-total-summary"
              style={{ color: "white", fontFamily: "Istok Web" }}
            >
              <div
                className="d-flex"
                style={{
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p>Subtotal:</p>
                <h6>Rs. 32,400</h6>
              </div>
              <div
                className="d-flex"
                style={{
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p>Tax:</p>
                <h6>3.5%</h6>
              </div>
              <div
                className="d-flex"
                style={{
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p>Delivery fee:</p>
                <h6>Rs. 40</h6>
              </div>
              <div
                className="d-flex"
                style={{
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p>Coupon Discount:</p>
                <h6>20%</h6>
              </div>
              <div
                className="d-flex"
                style={{
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p>Offer Discount:</p>
                <h6>30%</h6>
              </div>

              {/* Total Amount */}
              <div
                className="d-flex"
                style={{
                  justifyContent: "space-between",
                  marginTop: "20px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                <p>TOTAL</p>
                <h6 style={{ color: "#FF7F11" }}>Rs. 23,300</h6>
              </div>
            </div>

            {/* Checkout Button */}
            <div style={{ marginTop: "30px" }}>
              <OurButton w="100" text="PROCEED TO CHECKOUT" />
            </div>
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default CartPage;

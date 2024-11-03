import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import headphoneImg from "../../../assets/images/products/headphone.jpeg";
import { Box, Divider, Typography } from "@mui/material";
import "./CartPage.css";
import { Col, Row } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import OurButton from "../../../components/OurButton/OurButton";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectedCart,
} from "../../../features/user/cartSlice";
import { useNavigate } from "react-router-dom";
import { setSummaryData } from "../../../features/user/orderSlice";

const CartPage = () => {
  const cartItems = useSelector(selectedCart);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [summary, setSummary] = useState({
    summary: 0,
    tax: 0,
    subTotal: 0,
    total: 0,
    delivery: 0,
    offer: 0,
    taxPercent: "",
    offerPercentage: "",
  });

  const calculateSummary = () => {
    const subTotal = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    const taxRate = 0.011; //1.1%
    // const offerDiscount = 0.2; // 20%

    const tax = subTotal * taxRate;
    // const discount = subTotal * offerDiscount;
    const deliveryFee = subTotal > 500 ? 0 : 40;
    const total = (subTotal + tax + deliveryFee).toFixed(2);
    const taxPercentage = (taxRate * 100).toFixed(1) + "%";
    // const offerPercentage = (offerDiscount * 100).toFixed(0) + "%";

    setSummary({
      subTotal,
      tax,
      delivery: deliveryFee,
      // discount,
      total,
      taxPercent: taxPercentage,
      taxRate
      // offerPercentage,
    });
  };

  const handleQuantityChange = (e, item) => {
    if (e.target.value === "+") {
      dispatch(incrementQuantity(item.id));
    } else {
      dispatch(decrementQuantity(item.id));
    }
  };

  const handleCheckout = () => {
    const sendSummary = {
      totalAmount: summary.total,
      tax: summary.taxRate
    }
    dispatch(setSummaryData(sendSummary))
    navigate("/cart_process")
  }

  const handleDelete = (item) => {
    dispatch(removeFromCart(item.id));
  };

  useEffect(() => {
    calculateSummary();
  }, [cartItems]);

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
          {cartItems.length > 0
            ? `Your shopping cart (${cartItems.length})`
            : "Your shopping cart is empty"}
        </Typography>
        <Row style={{ marginTop: "30px" }}>
          {/* cart items */}
          <Col sm={12} md={6} lg={8}>
            {cartItems.length > 0 &&
              cartItems.map((item) => (
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
                      <br />
                      {item.price}
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontFamily: "Istok Web",
                        fontSize: "15px",
                        textAlign: "center",
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Col>
                  <Col lg={1} md={1} sm={1}>
                    <div className="cart-item-qty-div">
                      <button
                        style={{
                          backgroundColor: item.quantity === 1 ? "gray" : "",
                        }}
                        disabled={item.quantity === 1}
                        onClick={(e) => handleQuantityChange(e, item)}
                        value="-"
                      >
                        -
                      </button>
                      <Typography sx={{ color: "white" }}>
                        {item.quantity}
                      </Typography>
                      <button
                        style={{
                          backgroundColor: item.quantity === 10 ? "gray" : "",
                        }}
                        disabled={item.quantity === 10}
                        onClick={(e) => handleQuantityChange(e, item)}
                        value="+"
                      >
                        +
                      </button>
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
                        Rs. {Number(item.quantity * item.price)}
                      </Typography>
                      <span onClick={() => handleDelete(item)}>
                        <DeleteIcon
                          sx={{
                            color: "white",
                            marginLeft: "20px",
                            cursor: "pointer",
                          }}
                        />
                      </span>
                    </div>
                  </Col>
                  <Divider
                    sx={{
                      height: "1px",
                      background: "white",
                      width: "90%",
                      marginTop: "20px",
                    }}
                  />
                </Row>
              ))}
          </Col>

          {/* product summary details */}
          {cartItems.length > 0 && (
            <Col
              style={{
                backgroundColor: "#333",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              {/* Coupon Input Section */}
              {/* <div
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
              </div> */}

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
                  <h6>{summary.subTotal}</h6>
                </div>
                <div
                  className="d-flex"
                  style={{
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <p>Tax:</p>
                  <h6>{summary.taxPercent}</h6>
                </div>
                <div
                  className="d-flex"
                  style={{
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <p>Delivery fee:</p>
                  {summary.total > 500 ? (
                    "Free"
                  ) : (
                    <h6>Rs. {summary.delivery}</h6>
                  )}
                </div>
                {/* <div
                className="d-flex"
                style={{
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p>Coupon Discount:</p>
                <h6>20%</h6>
              </div> */}
                {/* <div
                  className="d-flex"
                  style={{
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <p>Offer Discount:</p>
                  <h6>{summary.offerPercentage}</h6>
                </div> */}

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
                  <h6 style={{ color: "#FF7F11" }}>{summary.total}</h6>
                </div>
              </div>

              {/* Checkout Button */}
              <div onClick={handleCheckout} style={{ marginTop: "30px" }}>
                <OurButton w="100" text="PROCEED TO CHECKOUT" />
              </div>
            </Col>
          )}
        </Row>
      </Box>
    </>
  );
};

export default CartPage;

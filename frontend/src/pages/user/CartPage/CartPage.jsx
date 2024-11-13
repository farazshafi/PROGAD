import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
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
import { toast } from "react-toastify";
import { findCouponsApi } from "../../../api/couponApi";
import { FaCheck } from "react-icons/fa";
import { selectedUser } from "../../../features/user/userSlice";

const CartPage = () => {
  const cartItems = useSelector(selectedCart);
  const user = useSelector(selectedUser)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [availableCoupon, setAvailableCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [summary, setSummary] = useState({
    summary: 0,
    tax: 0,
    subTotal: 0,
    total: 0,
    delivery: 0,
    offer: 0,
    taxPercent: "",
    couuponOffer: "",
  });

  const calculateSummary = () => {
    const subTotal = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    const taxRate = 0.011; // 1.1%
    const tax = subTotal * taxRate;
    const deliveryFee = subTotal > 500 ? 0 : 40;
    const couponPercentage = availableCoupon?.discount || 0;

    // Calculate the discount if a coupon is available and applied
    const discount = isApplied ? (subTotal * couponPercentage) / 100 : 0;
    const total = (subTotal + tax + deliveryFee - discount).toFixed(2);
    const taxPercentage = (taxRate * 100).toFixed(1) + "%";

    setSummary({
      subTotal,
      tax,
      delivery: deliveryFee,
      total,
      taxPercent: taxPercentage,
      discount,
      couponOffer: couponPercentage,
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
    const couponDiscount = availableCoupon ? availableCoupon.discount : 0;
    const sendSummary = {
      totalAmount: summary.total,
      tax: summary.taxPercent,
      couponDiscount: couponDiscount,
      deliveryFee: summary.delivery,
      subTotal: summary.subTotal,
      couponCode: isApplied ? couponCode : null,
    };
    dispatch(setSummaryData(sendSummary));
    navigate("/cart_process");
  };

  const handleDelete = (item) => {
    dispatch(removeFromCart(item.id));
  };

  const handleApplyCoupon = () => {
    if (availableCoupon) {
      setIsApplied(true);
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const findCoupon = async () => {
    if(!user){
      toast.warning("Please Login to apply coupon")
      navigate("/login")
    }
    try {
      setIsApplied(false);
      console.log("coupon code:", couponCode);
      const result = await findCouponsApi(couponCode);
      console.log("result codupon ", result);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      setAvailableCoupon(result.data);
    } catch (err) {
      console.error("Error applying coupon:", err);
      toast.error(err.message || "Error applying coupon");
    }
  };

  useEffect(() => {
    calculateSummary();
  }, [cartItems, isApplied]);

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
                    <img
                      className="rounded-lg"
                      src={item.image}
                      alt="Product"
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover",
                      }}
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
                        ₹ {Number(item.quantity * item.price)}
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
              <div
                className="cart-coupoun"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "5px",
                    border: "none",
                    marginRight: "10px",
                    fontSize: "16px",
                  }}
                />
                <span onClick={findCoupon}>
                  <OurButton text="Find" />
                </span>
              </div>

              {availableCoupon && (
                <div className="my-4 bg-[#262626] w-full rounded py-4 px-3 flex items-center">
                  <p className="text-black bg-white py-1 px-2 rounded text-md font-poppins w-fit">
                    {availableCoupon.name}
                    <span className="ml-2 font-poppins text-[#ff7f11]">
                      -{availableCoupon.discount}% Off
                    </span>
                  </p>
                  <div
                    onClick={handleApplyCoupon}
                    className="text-white w-fit ml-auto cursor-pointer font-poppins bg-[#ff7f11] px-[10px] py-1 rounded hover:bg-orange-600 transition"
                  >
                    {isApplied ? <FaCheck /> : <>Apply</>}
                  </div>
                </div>
              )}

              {!availableCoupon && <div className="h-5"></div>}

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
                  <h6>₹{summary.subTotal}</h6>
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
                    <h6>₹ {summary.delivery}</h6>
                  )}
                </div>
                {isApplied && (
                  <div
                    className="d-flex"
                    style={{
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <p>Coupon Discount:</p>
                    <h6>{availableCoupon?.discount}%</h6>
                  </div>
                )}
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

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
import {
  selectedOrder,
  setSummaryData,
} from "../../../features/user/orderSlice";
import { toast } from "react-toastify";
import { checkCartProductValidApi } from "../../../api/productApi";

const CartPage = () => {
  const cartItems = useSelector(selectedCart);
  const orderDetails = useSelector(selectedOrder);

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
    taxPercent: 0,
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
    const taxPercentage = (taxRate * 100).toFixed(1);

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

  const handleCheckout = async () => {
    try {
      const cartitemIds = [];
      for (const items of cartItems) {
        cartitemIds.push(items.id);
      }
      const result = await checkCartProductValidApi(cartitemIds);
      if (result?.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          const products = result.response.data.unAvailableProducts;
          toast.error(
            `The following products are not available: ${products.join(", ")}. Please Remove that product`
          );
          return;
        }
      }
    } catch (err) {
      toast.error("Failed to checkout. Please try again later.");
      console.error("Checkout Error:", err);
    }
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
    if (orderDetails && Object.keys(orderDetails.shippingAddress).length > 0) {
      if (orderDetails.paymentMethod != null) {
        return navigate("/cart_process/place_order");
      }
      return navigate("/cart_process/payment");
    } else {
      navigate("/cart_process/shipping");
    }
  };

  const handleDelete = (item) => {
    dispatch(removeFromCart(item.id));
  };

  useEffect(() => {
    calculateSummary();
  }, [cartItems, isApplied]);

  return (
    <>
      <Header />
      <Box className="cart-container">
        <p className="font-poppins text-white text-xl">
          {cartItems.length > 0
            ? `Your shopping cart (${cartItems.length})`
            : "Your shopping cart is empty"}
        </p>
        {cartItems.length > 0 && (
          <div className="space-y-4 mt-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center font-poppins p-4 rounded-lg shadow-white shadow-[rgba(255,255,255,0.32)] shadow-md space-y-4 sm:space-y-0 sm:space-x-4 bg-gray-200 !text-black sm:!text-white sm:bg-transparent"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />

                {/* Details */}
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-700 sm:text-gray-400">
                    Price: ₹{item.price}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center space-x-2">
                  <button
                    className="py-2 px-3 rounded bg-white text-black"
                    style={{
                      backgroundColor: item.quantity === 1 ? "gray" : "",
                    }}
                    disabled={item.quantity === 1}
                    onClick={(e) => handleQuantityChange(e, item)}
                    value="-"
                  >
                    -
                  </button>
                  <Typography
                    sx={{
                      color: {
                        xs: "black",
                        sm: "black",
                        md: "white",
                        lg: "white",
                      },
                    }}
                  >
                    {item.quantity}
                  </Typography>

                  <button
                    className="py-2 px-3 rounded bg-white text-black"
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

                {/* Subtotal */}
                <div>
                  <p className="text-lg font-semibold">
                    Total:{" "}
                    <span className="text-[#ff7f11]">
                      ₹{item.subTotal.toFixed(2)}
                    </span>
                  </p>
                </div>
                <div className="bg-[#ff7f11] sm:bg-transparent text-white rounded p-2">
                  <span
                    className="flex items-center"
                    onClick={() => handleDelete(item)}
                  >
                    <p className="block lg:hidden">Delete</p>

                    {/* Show the DeleteIcon only on large screens */}
                    <DeleteIcon
                      className="hidden lg:block"
                      sx={{
                        color: "white",
                        marginLeft: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <Row style={{ marginTop: "30px" }}>
          {cartItems.length > 0 && (
            <Col
              style={{
                backgroundColor: "#333",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <div className="w-full">
                <div className="flex text-lg text-white font-poppins justify-between">
                  <p>Subtotal:</p>
                  <p>₹{summary.subTotal}</p>
                </div>
                <div className="flex text-lg text-white font-poppins justify-between">
                  <p>Tax:</p>
                  <p>{summary.taxPercent}%</p>
                </div>
                <div className="flex text-lg text-white font-poppins justify-between">
                  <p>Delivery fee:</p>
                  {summary.total > 500 ? (
                    <p>Free</p>
                  ) : (
                    <p>{summary.delivery}</p>
                  )}
                </div>
                <div className="flex text-lg text-white font-poppins justify-between">
                  <p>Total:</p>
                  <p>{summary.total}</p>
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

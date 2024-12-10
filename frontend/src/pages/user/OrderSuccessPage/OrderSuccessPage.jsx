import React from "react";
import "./OrderSuccessPage.css";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import OurButton from "../../../components/OurButton/OurButton";
import Lottie from "lottie-react";
import orderSuccessAnimation from "../../../assets/animations/order success.json";
import Header from "../../../components/Header/Header";

const OrderSuccessPage = () => {
  const { id } = useParams();
  return (
    <>
      <Header />
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography color="white" variant="h4" gutterBottom>
          Order Placed Successfully!
        </Typography>

        <div className="">
          <Lottie
            animationData={orderSuccessAnimation}
            style={{
              width: 200,
              height: 200,
              // backgroundColor: "white",
              // borderRadius: "15%",
              // padding: "20px",
            }}
            loop={false}
            autoPlay={true}
          />
        </div>

        <Typography variant="h6" color="white" mb={4}>
          Thank you for your order!
        </Typography>
        <Box display="flex" gap={2}>
          <Link to={"/"}>
            <Button
              variant="contained"
              sx={{ background: "white", color: "black" }}
            >
              Go Home
            </Button>
          </Link>
          <Link to={`/order_details/${id}`}>
            <OurButton text={"View Order"} />
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default OrderSuccessPage;

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Img1 from "../../assets/images/products/boat.jpeg";
import Img2 from "../../assets/images/products/jbl.jpeg";
import OurButton from "../OurButton/OurButton";

const PlaceOrderSection = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={4}>
        {/* Address Section */}
        <Grid item lg={4} xs={12}>
          <Paper
            sx={{ padding: "20px", background: "#212121", color: "white" }}
          >
            <Typography variant="h6">Saved Address</Typography>
            <Divider
              sx={{ height: "1px", background: "white", margin: "10px 0" }}
            />
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="body1">
                Address: India, Kerala, Kasaragod, 671124, ABCo mahal po pattu,
                house 314
              </Typography>
            </Grid>
            <Typography variant="body1">User Details</Typography>
            <Typography variant="body1">Faraz Shafi</Typography>
            <Typography variant="body1">farazpchu777@gmail.com</Typography>
            <IconButton
              sx={{
                color: "#fff",
                backgroundColor: "#FF7F11",
                marginTop: "10px",
              }}
              aria-label="edit address"
            >
              <EditIcon />
            </IconButton>
          </Paper>
        </Grid>

        {/* Payment Method Section for PayPal */}
        <Grid item lg={4} xs={12}>
          <Paper
            sx={{
              padding: "20px",
              background: "#212121",
              color: "white",
            }}
          >
            <Typography variant="h6">Payment Method</Typography>
            <Divider
              sx={{ height: "1px", background: "white", margin: "10px 0" }}
            />
            <Typography variant="body1">PayPal</Typography>
            <Typography sx={{ mb: "20px" }} variant="body2">
              Pay securely using your PayPal account.
            </Typography>
            <OurButton w={"100"} text="Proceed with PayPal" />
          </Paper>
        </Grid>

        {/* Cart items */}
        <Grid item xs={12}>
          <Paper
            sx={{ padding: "20px", backgroundColor: "#212121", color: "white" }}
          >
            <Typography variant="h6">Cart Items</Typography>
            <Divider
              sx={{ height: "1px", background: "white", margin: "10px 0" }}
            />
            {/* Product 1 */}
            <Grid container alignItems="center">
              <Grid item xs={2}>
                <img
                  src={Img1}
                  alt="Apple iPhone 15"
                  style={{ width: "80px", height: "auto" }}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">
                  Apple iPhone 15 (Black, 128 GB)
                </Typography>
                <Typography variant="body2">
                  A brief description will be placed here about the product...
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="center">
                <Typography variant="body1">X3</Typography>
                <Typography variant="body1">Rs. 79,000</Typography>
              </Grid>
              <Grid item xs={3} textAlign="right">
                <Typography variant="body1">Rs. 237,000</Typography>
              </Grid>
            </Grid>

            {/* Product 2 */}
            <Grid container alignItems="center" mt={2}>
              <Grid item xs={2}>
                <img
                  src={Img2}
                  alt="Apple iPhone 15"
                  style={{ width: "80px", height: "auto" }}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">
                  Apple iPhone 15 (Black, 128 GB)
                </Typography>
                <Typography variant="body2">
                  A brief description will be placed here about the product...
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="center">
                <Typography variant="body1">X3</Typography>
                <Typography variant="body1">Rs. 79,000</Typography>
              </Grid>
              <Grid item xs={3} textAlign="right">
                <Typography variant="body1">Rs. 237,000</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Price Summary */}
        <Grid item lg={5} xs={12}>
          <Card
            sx={{ padding: "20px", backgroundColor: "#212121", color: "white" }}
          >
            <Grid container justifyContent="space-between">
              <Typography
                variant="body1"
                sx={{ fontFamily: '"Istok Web", sans-serif' }}
              >
                Subtotal
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: '"Istok Web", sans-serif' }}
              >
                Rs. 3,830,000/-
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography
                variant="body1"
                sx={{ fontFamily: '"Istok Web", sans-serif' }}
              >
                Tax
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: '"Istok Web", sans-serif' }}
              >
                3.5%
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography
                variant="body1"
                sx={{ fontFamily: '"Istok Web", sans-serif' }}
              >
                Delivery Fee
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: '"Istok Web", sans-serif' }}
              >
                Rs. 80/-
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography
                variant="body1"
                sx={{ fontFamily: '"Istok Web", sans-serif' }}
              >
                Coupon Discount
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: '"Istok Web", sans-serif' }}
              >
                20%
              </Typography>
            </Grid>
            <Divider sx={{ height: "1px", background: "white", mt: "20px" }} />
            <Grid container justifyContent="space-between" mt={2}>
              <Typography
                variant="h6"
                sx={{ fontFamily: '"Istok Web", sans-serif', fontWeight: 800 }}
              >
                TOTAL
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Istok Web", sans-serif',
                  fontWeight: 800,
                  color: "#FF7F11",
                }}
              >
                Rs. 2,330,000/-
              </Typography>
            </Grid>
          </Card>
        </Grid>

        {/* Payment Methods */}
        <Grid item lg={7} xs={12}>
          <Card
            sx={{
              padding: "20px",
              backgroundColor: "#333",
              textAlign: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{ margin: "10px", backgroundColor: "#FFC439" }}
            >
              PayPal
            </Button>
            <Button
              variant="contained"
              sx={{ margin: "10px", backgroundColor: "#0079FF" }}
            >
              Venmo
            </Button>
            <Button
              variant="contained"
              sx={{ margin: "10px", backgroundColor: "#FFCB01" }}
            >
              Pay Later
            </Button>
            <Button
              variant="contained"
              sx={{ margin: "10px", backgroundColor: "#000" }}
            >
              Debit or Credit Card
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceOrderSection;

// import
import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import adminRoute from "./routes/adminRouter.js";
import categoryRoute from "./routes/categoryRouter.js";
import productRoute from "./routes/productRouter.js";
import connectDB from "./config/db.js";
import cors from "cors"

// configuration
dotenv.config();
connectDB()

// initialization
const app = express();
const port = process.env.PORT || 2000;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// routers
app.use("/api/user/", userRoute);
app.use("/api/admin/", adminRoute);
app.use("/api/category/", categoryRoute);
app.use("/api/product/", productRoute );

app.get("/", (req, res) => {
  res.send("Api is running...");
});

// listen
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});


// Admin side :
// Admin sign in
 // Product management(add, edit & delete(soft delete) products).
// Products must have multiple images (minimum 3 images).
// Images should be cropped and resized properly before upload.
// .
// User side :
// Sign up using OTP with OTP timer and Resend Otp
// Login or signup with single sign on (google , facebook …)
// List products on the user side.
// Product details view on the user side with image zoom.
// Product detailed page should contain following 
//  Breadcrumbs 
//  Ratings 
//  Price
//  Discounts or coupons applied
//  Reviews 
//  Stock 
// Proper error handles Sold out / unavailable  and  out of stock 
//  Highlights / specs of product 
//  Related product recommendations

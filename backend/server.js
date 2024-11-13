// import
import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import adminRoute from "./routes/adminRouter.js";
import categoryRoute from "./routes/categoryRouter.js";
import productRoute from "./routes/productRouter.js";
import addressRoute from "./routes/addressRouter.js";
import brandRoute from "./routes/brandRouter.js";
import orderRoute from "./routes/orderRouter.js";
import salesRoute from "./routes/salesRouter.js";
import offerRoute from "./routes/offerRouter.js";
import wishlistRoute from "./routes/wishlistRouter.js";
import couponRoute from "./routes/couponRouter.js";
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
    origin: "http://localhost:3000"
  })
);

// routers
app.use("/api/user/", userRoute);
app.use("/api/admin/", adminRoute);
app.use("/api/category/", categoryRoute);
app.use("/api/product/", productRoute );
app.use("/api/address/", addressRoute);
app.use("/api/order/", orderRoute);
app.use("/api/brand/", brandRoute);
app.use("/api/wishlist/", wishlistRoute);
app.use("/api/coupon/", couponRoute);
app.use("/api/offer/", offerRoute);
app.use("/api/sales/", salesRoute);

app.get("/", (req, res) => {
  res.send("Api is running...");
});

// listen
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
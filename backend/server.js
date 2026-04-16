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
const allowedOrigins = [
  "http://localhost:3000",
  "https://progad.farazshafi.site",
  process.env.FRONTEND_URL,
].filter(Boolean);

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
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
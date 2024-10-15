// import
import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

// configuration
dotenv.config();
connectDB()

// initialization
const app = express();
const port = process.env.PORT || 2000;

// middlewares
app.use(express.json());

// routers
app.use("/api/user/", userRoute);

app.get("/", (req, res) => {
  res.send("Api is running...");
});

// listen
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

import express from "express";
import {
  cancelOrder,
  createRazorpayOrder,
  getAllOrders,
  getOrderDetails,
  listAllOrders,
  makeOrder,
  updateStatus,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/make_order", protect, makeOrder);
router.post("/create_razorpay_order", protect, createRazorpayOrder);
router.get("/get_all_orders/userId/:id", protect, getAllOrders);
router.get("/get_order_details/:id", protect, getOrderDetails);
router.patch("/cancel_order/:id", protect, cancelOrder);
router.get("/list_orders", protect, admin, listAllOrders);
router.patch("/update_status/:id", protect, admin, updateStatus);

export default router;

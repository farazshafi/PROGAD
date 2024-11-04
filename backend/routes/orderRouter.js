import express from "express";
import {
  cancelOrder,
  getAllOrders,
  getOrderDetails,
  listAllOrders,
  makeOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/make_order", protect, makeOrder);
router.get("/get_all_orders/userId/:id", protect, getAllOrders);
router.get("/get_order_details/:id", protect, getOrderDetails);
router.patch("/cancel_order/:id", protect, cancelOrder);
router.get("/list_orders", protect, admin, listAllOrders);

export default router;

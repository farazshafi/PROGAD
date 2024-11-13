import express from "express";
import { getSalesReport } from "../controllers/salesController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/sales_report", protect, admin, getSalesReport);

export default router;

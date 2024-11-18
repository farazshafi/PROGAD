import express from "express";
import { downloadSalesReport, getSalesChartData, getSalesReport } from "../controllers/salesController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/sales_report", protect, admin, getSalesReport);
router.get("/sales_chart", protect, admin, getSalesChartData);


export default router;

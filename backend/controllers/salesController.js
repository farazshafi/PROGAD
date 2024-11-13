import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import dayjs from "dayjs";

const getDateRange = (type) => {
  const today = dayjs();
  let startDate;
  switch (type) {
    case "daily":
      startDate = today.startOf("day");
      break;
    case "weekly":
      startDate = today.startOf("week");
      break;
    case "monthly":
      startDate = today.startOf("month");
      break;
    default:
      startDate = today.subtract(1, "month"); // Default to past month for custom range
      break;
  }
  return startDate.toDate();
};

// @desc    Get sales report
// @route   GET /api/sales/sales_report?type=weekly
// @access  Private Admin
export const getSalesReport = asyncHandler(async (req, res) => {
  const { type = "daily", startDate, endDate } = req.query;

  // Validate the type
  if (!["daily", "weekly", "monthly", "custom"].includes(type)) {
    res.status(400);
    return res.json({ message: "Invalid report type" });
  }

  let dateRangeStart;
  let dateRangeEnd = new Date();

  if (type === "custom") {
    if (!startDate || !endDate) {
      res.status(400);
      return res.json({
        message: "Custom date range requires both startDate and endDate",
      });
    }
    dateRangeStart = new Date(startDate);
    dateRangeEnd = new Date(endDate);
  } else {
    dateRangeStart = getDateRange(type);
  }

  const salesData = await Order.aggregate([
    {
      $match: {
        orderDate: {
          $gte: dateRangeStart,
          $lte: dateRangeEnd,
        },
        paymentStatus: "paid",
        status: "delivered",
      },
    },
    {
      $addFields: {
        // Calculate discountAmount based on percentage
        discountAmount: {
          $cond: {
            if: { $gt: ["$couponDiscount", 0] },
            then: {
              $multiply: ["$totalPrice", { $divide: ["$couponDiscount", 100] }],
            },
            else: 0,
          },
        },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
        totalSales: { $sum: "$totalPrice" },
        ordersCount: { $sum: 1 },
        totalDiscounts: { $sum: "$discountAmount" },
        netRevenue: { $sum: { $subtract: ["$totalPrice", "$discountAmount"] } },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  res.json(salesData);
});

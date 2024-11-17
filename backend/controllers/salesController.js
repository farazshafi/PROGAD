import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import dayjs from "dayjs";
import XLSX from "xlsx";
import PDFDocument from "pdfkit";

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

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // months are 0-based
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
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

// @desc    Download sales report (PDF, EXCEL)
// @route   GET /api/sales/sales_report?type=weekly
// @access  Private Admin
export const downloadSalesReport = asyncHandler(async (req, res) => {
  const { type = "daily", startDate, endDate } = req.query;

  let dateRangeStart;
  let dateRangeEnd = new Date();

  if (type === "custom") {
    if (!startDate || !endDate) {
      return res.status(400).json({
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
        orderDate: { $gte: dateRangeStart, $lte: dateRangeEnd },
        paymentStatus: "paid",
        status: "delivered",
      },
    },
    {
      $addFields: {
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

  if (req.query.format === "xlsx") {
    const ws = XLSX.utils.json_to_sheet(salesData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=sales_report.xlsx"
    );
    res.send(excelBuffer);
    return;
  }

  if (req.query.format === "pdf") {
    const doc = new PDFDocument();
    doc.pipe(res);

    doc.fontSize(18).text("Sales Report", { align: "center" });
    doc
      .fontSize(12)
      .text(
        `From: ${dateRangeStart.toISOString()} To: ${dateRangeEnd.toISOString()}`,
        {
          align: "center",
        }
      );

    doc.moveDown();
    doc.text("---------------------------------------------------------------");
    doc.moveDown();

    salesData.forEach((data) => {
      doc.text(`Date: ${data._id}`);
      doc.text(`Total Sales: $${data.totalSales.toFixed(2)}`);
      doc.text(`Orders Count: ${data.ordersCount}`);
      doc.text(`Total Discounts: $${data.totalDiscounts.toFixed(2)}`);
      doc.text(`Net Revenue: $${data.netRevenue.toFixed(2)}`);
      doc.moveDown();
      doc.text(
        "---------------------------------------------------------------"
      );
      doc.moveDown();
    });

    doc.end();
    return;
  }

  res.status(400).json({ message: "Invalid format requested" });
});

// @desc    Get sales chart data
// @route   GET /api/sales/sales_chart?type=daily
// @access  Private Admin
export const getSalesChartData = async (req, res) => {
  try {
    const { filter } = req.query;

    let matchCriteria = {};
    let groupCriteria = {};
    let projectCriteria = {};

    if (filter === "daily") {
      matchCriteria = {
        orderDate: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 6)),
        },
      };
      groupCriteria = {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
        totalSales: { $sum: "$totalPrice" },
      };
      projectCriteria = { _id: 0, date: "$_id", totalSales: 1 };
    } else if (filter === "weekly") {
      matchCriteria = {
        orderDate: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      };
      groupCriteria = {
        _id: { $isoWeek: "$orderDate" },
        totalSales: { $sum: "$totalPrice" },
      };
      projectCriteria = { _id: 0, week: "$_id", totalSales: 1 };
    } else if (filter === "monthly") {
      matchCriteria = {
        orderDate: {
          $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        },
      };
      groupCriteria = {
        _id: { $month: "$orderDate" },
        totalSales: { $sum: "$totalPrice" },
      };
      projectCriteria = { _id: 0, month: "$_id", totalSales: 1 };
    } else if (filter === "yearly") {
      matchCriteria = {};
      groupCriteria = {
        _id: { $year: "$orderDate" },
        totalSales: { $sum: "$totalPrice" },
      };
      projectCriteria = { _id: 0, year: "$_id", totalSales: 1 };
    }

    const salesData = await Order.aggregate([
      { $match: matchCriteria },
      { $group: groupCriteria },
      { $project: projectCriteria },
      { $sort: { date: 1 } }, 
    ]);

    const labels = salesData.map((entry) => {
      if (filter === "daily") {
        return entry.date; // e.g., "2024-11-01"
      } else if (filter === "weekly") {
        return `Week ${entry.week}`; // e.g., "Week 1"
      } else if (filter === "monthly") {
        return new Date(0, entry.month - 1).toLocaleString("en", {
          month: "long",
        }); // e.g., "January"
      } else if (filter === "yearly") {
        return entry.year; // e.g., "2023"
      }
    });

    const values = salesData.map((entry) => entry.totalSales);

    res.status(200).json({
      labels,
      values,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

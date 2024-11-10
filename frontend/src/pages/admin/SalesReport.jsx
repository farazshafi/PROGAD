import React, { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { getSalesReportApi } from "../../api/salesApi";
import { DatePicker } from "@mui/x-date-pickers";
import { Download, Search } from "@mui/icons-material";

const SalesReport = () => {
  const [reportType, setReportType] = useState("weekly");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [salesReport, setSalesReport] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const sampleSalesReport = [
    {
      date: "2024-11-07",
      totalSalesAmount: 2020.99,
      totalDiscount: 150.5,
      totalCouponDeduction: 20.2,
    },
    {
      date: "2024-11-06",
      totalSalesAmount: 1500.75,
      totalDiscount: 100.25,
      totalCouponDeduction: 10.5,
    },
    {
      date: "2024-11-05",
      totalSalesAmount: 1800.65,
      totalDiscount: 200.0,
      totalCouponDeduction: 15.75,
    },
    {
      date: "2024-11-04",
      totalSalesAmount: 2100.25,
      totalDiscount: 125.0,
      totalCouponDeduction: 25.0,
    },
    {
      date: "2024-11-03",
      totalSalesAmount: 3000.0,
      totalDiscount: 300.0,
      totalCouponDeduction: 30.0,
    },
  ];

  const fetchSalesReport = async () => {
    try {
      const params = {
        reportType,
        ...(reportType === "custom" && startDate && endDate
          ? { startDate, endDate }
          : {}),
      };
      const result = await getSalesReportApi(params);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error("Server error");
          return;
        }
      }
      console.log("result bro this", result);
      setSalesReport(result.data?.report || []);
    } catch (err) {
      toast.error("Error fetching sales report");
      console.error("Error fetching sales report:", err);
    }
  };

  useEffect(() => {
    fetchSalesReport();
  }, [reportType, startDate, endDate]);

  return (
    <Box className="p-6">
      <p className="text-4xl text-center text-white py-4 mb-[10px]">
        Sales Report
      </p>

      {/* Filter Section */}
      <Box className="flex items-center gap-4 mb-6">
        <TextField
          variant="outlined"
          label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => fetchSalesReport()}>
                <Search />
              </IconButton>
            ),
          }}
          className="w-1/3"
        />

        <FormControl className="w-1/4">
          <InputLabel>Report Type</InputLabel>
          <Select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            label="Report Type"
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="year">Yearly</MenuItem>
            <MenuItem value="custom">Custom</MenuItem>
          </Select>
        </FormControl>

        {reportType === "custom" && (
          <Box className="flex gap-4 items-center">
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        )}
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper} className="shadow-lg mb-4">
        <Table>
          <TableHead className="bg-black">
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Total Sales Amount</TableCell>
              <TableCell>Total Discount</TableCell>
              <TableCell>Total Coupon Deduction</TableCell>
              <TableCell>Net Revenue</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleSalesReport
              .filter(
                (item) =>
                  item.date.includes(searchQuery) ||
                  String(item.totalSalesAmount).includes(searchQuery) ||
                  String(item.totalDiscount).includes(searchQuery) ||
                  String(item.totalCouponDeduction).includes(searchQuery)
              )
              .map((report, index) => (
                <TableRow key={index}>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.totalSalesAmount}</TableCell>
                  <TableCell>{report.totalDiscount}</TableCell>
                  <TableCell>{report.totalCouponDeduction}</TableCell>
                  <TableCell>
                    Rs.{report.totalSalesAmount - report.totalDiscount}
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <Download />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalesReport;

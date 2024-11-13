import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { saveAs } from "file-saver";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [reportRange, setReportRange] = useState("daily");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filters, setFilters] = useState({
    discount: true,
    overallSales: true,
    overallOrders: true,
  });

  useEffect(() => {
    fetchSalesData();
  }, [reportRange, startDate, endDate]);

  const fetchSalesData = async () => {
    // Mock API call for fetching sales data based on filters
    // Replace with your actual API call
    const response = [
      {
        date: "2024-11-01",
        totalSales: 1200,
        orders: 5,
        discounts: 100,
        netRevenue: 1100,
      },
      {
        date: "2024-11-02",
        totalSales: 1500,
        orders: 7,
        discounts: 200,
        netRevenue: 1300,
      },
    ];
    setSalesData(response);
  };

  const handleRangeChange = (event) => {
    setReportRange(event.target.value);
  };

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const downloadReport = (format) => {
    const blob = new Blob([JSON.stringify(salesData, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, `sales_report.${format}`);
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className="text-center font-bold mb-4">
        Sales Report
      </Typography>

      {/* Filter and Range Selection */}
      <Box className="flex items-center justify-between mb-6">
        <Select
          value={reportRange}
          onChange={handleRangeChange}
          className="w-1/4"
        >
          <MenuItem value="daily">1 Day</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
        </Select>

        {reportRange === "custom" && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box className="flex">
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => (
                  <TextField {...params} className="mx-2" />
                )}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => (
                  <TextField {...params} className="mx-2" />
                )}
              />
            </Box>
          </LocalizationProvider>
        )}
      </Box>

      {/* Sales Data Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Total Sales</TableCell>
              <TableCell>Orders Count</TableCell>
              <TableCell>Discounts</TableCell>
              <TableCell>Net Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.date}</TableCell>
                <TableCell>{`$${data.totalSales.toFixed(2)}`}</TableCell>
                <TableCell>{data.orders}</TableCell>
                <TableCell>{`$${data.discounts.toFixed(2)}`}</TableCell>
                <TableCell>{`$${data.netRevenue.toFixed(2)}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex gap-2 mt-3">
        <button className="text-white bg-blue-600 py-2 px-3 rounded-md hover:bg-gray-400" onClick={() => downloadReport("pdf")}>Download PDF</button>
        <button className="text-black bg-white py-2 px-3 rounded-md hover:bg-gray-400" onClick={() => downloadReport("xlsx")}>Download Excel</button>
      </div>

      {/* Summary Info */}
      <Box className="text-right mt-4">
        <Typography variant="subtitle1">
          Overall Sales: $
          {salesData.reduce((acc, cur) => acc + cur.totalSales, 0).toFixed(2)}
        </Typography>
        <Typography variant="subtitle1">
          Overall Orders: {salesData.reduce((acc, cur) => acc + cur.orders, 0)}
        </Typography>
        <Typography variant="subtitle1">
          Overall Discounts: $
          {salesData.reduce((acc, cur) => acc + cur.discounts, 0).toFixed(2)}
        </Typography>
      </Box>
    </div>
  );
};

export default SalesReport;

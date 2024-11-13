import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { saveAs } from "file-saver";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { downloadSalesReportApi, getSalesReportApi } from "../../api/salesApi";

const SalesReport = () => {
  const [reportRange, setReportRange] = useState("daily");
  const [report, setReport] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [params, setParams] = useState({
    path: "daily",
  });

  const fetchSalesData = async (params) => {
    try {
      const result = await getSalesReportApi(params);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      console.log("Sales report:", result);
      setReport(result.data);
    } catch (err) {
      toast.error("Error fetching sales data");
      console.error("Error fetching sales data:", err);
    }
  };

  const handleRangeChange = (event) => {
    const selectedRange = event.target.value;
    setReportRange(selectedRange);
    setParams((prevParams) => ({
      ...prevParams,
      path: selectedRange,
    }));
  };

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const downloadReport = async (format) => {
    try {
      const downloadParams = {
        path: reportRange,
        format: format,
        startDate:
          reportRange === "custom" && startDate
            ? dayjs(startDate).format("YYYY-MM-DD")
            : null,
        endDate:
          reportRange === "custom" && endDate
            ? dayjs(endDate).format("YYYY-MM-DD")
            : null,
      };

      if (reportRange === "custom") {
        if(startDate === null || endDate === null){
          return toast.error(" select date")
        }
      }

      const result = await downloadSalesReportApi(downloadParams);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          console.log(" Could not download");
          return;
        }
      }
      console.table("download result: ", result);
      toast.success(`Sales report downloaded as ${format.toUpperCase()}`);
    } catch (err) {
      toast.error("Error downloading report");
      console.error("Error downloading report:", err);
    }
  };

  useEffect(() => {
    if (reportRange === "custom") {
      if (startDate && endDate) {
        setParams({
          path: "custom",
          startDate: dayjs(startDate).format("YYYY-MM-DD"),
          endDate: dayjs(endDate).format("YYYY-MM-DD"),
        });
      }
    } else {
      fetchSalesData(params);
    }
  }, [reportRange, startDate, endDate]);

  useEffect(() => {
    if (reportRange !== "custom" || (startDate && endDate)) {
      fetchSalesData(params);
    }
  }, [params]);

  return (
    <div className="p-4">
      <Typography variant="h4" className="text-center font-bold mb-4">
        Sales Report
      </Typography>

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
          {report && report.length > 0 && (
            <TableBody>
              {report.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data._id}</TableCell>
                  <TableCell>{`₹${data.totalSales.toFixed(2)}`}</TableCell>
                  <TableCell>{data.ordersCount}</TableCell>
                  <TableCell>{`₹${data.totalDiscounts.toFixed(2)}`}</TableCell>
                  <TableCell>{`₹${data.netRevenue.toFixed(2)}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <div className="flex gap-2 mt-3">
        <button
          className="text-white bg-blue-600 py-2 px-3 rounded-md hover:bg-gray-400"
          onClick={() => downloadReport("pdf")}
        >
          Download PDF
        </button>
        <button
          className="text-black bg-white py-2 px-3 rounded-md hover:bg-gray-400"
          onClick={() => downloadReport("xlsx")}
        >
          Download Excel
        </button>
      </div>

      {report && report.length > 0 && (
        <Box className="text-right mt-4">
          <Typography variant="subtitle1">
            Overall Sales: ₹
            {report.reduce((acc, cur) => acc + cur.totalSales, 0).toFixed(2)}
          </Typography>
          <Typography variant="subtitle1">
            Overall Orders:{" "}
            {report.reduce((acc, cur) => acc + cur.ordersCount, 0)}
          </Typography>
          <Typography variant="subtitle1">
            Overall Discounts: ₹
            {report
              .reduce((acc, cur) => acc + cur.totalDiscounts, 0)
              .toFixed(2)}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default SalesReport;

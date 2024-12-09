import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getTopSellingProductApi } from "../../api/productApi";
import { getTopSellingCategoriesApi } from "../../api/categoryApi";
import { getTopSellingBrandsApi } from "../../api/brandApi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import { getSalesChartDataApi } from "../../api/salesApi";
import { useSelector } from "react-redux";
import { selectedAdmin } from "../../features/admin/adminSlice";
import { useNavigate } from "react-router-dom";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const mockSalesData = {
  daily: {
    labels: ["01-Nov", "02-Nov", "03-Nov", "04-Nov", "05-Nov", "06-Nov"],
    values: [1500, 2000, 1800, 2200, 2100, 1000],
  },
  weekly: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    values: [8000, 9000, 10000, 9500],
  },
  monthly: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [5000, 7000, 8000, 10000, 12000, 15000],
  },
  yearly: {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    values: [50000, 60000, 70000, 80000, 90000],
  },
};

const DashboardPage = () => {
  const admin = useSelector(selectedAdmin)

  const navigate = useNavigate()

  const [topProducts, setTopProducts] = useState(null);
  const [topCategories, setTopCategories] = useState(null);
  const [topBrands, setTopBrands] = useState(null);
  const [filter, setFilter] = useState("monthly");
  const [params, setParams] = useState({
    path: "monthly",
  });

  const [salesData, setSalesData] = useState({
    labels: ["01-Nov", "02-Nov", "03-Nov", "04-Nov", "05-Nov", "06-Nov"],
    datasets: [
      {
        label: "Sales",
        data: [1500, 2000, 1800, 2200, 2100, 1000],
        borderColor: "#00a6ff",
        backgroundColor: "#ff0000",
        tension: 0.4,
        fill: true,
      },
    ],
  });

  const handleFilterSelection = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    setParams((prevParams) => ({
      ...prevParams,
      path: selectedFilter,
    }));
    handleFilterChange(selectedFilter);
  };

  const handleFilterChange = async (path) => {
    const data = await fetchSalesData(path);
    setSalesData({
      labels: data?.labels,
      datasets: [
        {
          ...salesData.datasets[0],
          data: data.values,
        },
      ],
    });
  };

  const fetchTopProducts = async () => {
    const result = await getTopSellingProductApi(10);
    setTopProducts(result);
  };

  const fetchTopCategories = async () => {
    const result = await getTopSellingCategoriesApi();
    console.log("top categories:", result);
    setTopCategories(result);
  };

  const fetchTopBrands = async () => {
    const result = await getTopSellingBrandsApi();
    console.log("top categories:", result);
    setTopBrands(result);
  };

  const fetchSalesData = async (path) => {
    console.log("pathy : ",path)
    const result = await getSalesChartDataApi(path);
    console.log("result:", result)
    // return mockSalesData[path];
    
    return {
      labels: result.labels, 
      values: result.values,
    };
  };

  useEffect(() => {
    if(!admin){
      return navigate("/admin_login")
    }
    fetchTopProducts();
    fetchTopCategories();
    fetchTopBrands();
  }, []);

  return (
    <>
      <Typography variant="h4" className="text-center mt-3 font-bold mb-6">
        Admin Dashboard
      </Typography>

      {/* chart */}
      <div className="mt-6 px-4 grid grid-cols-1 md:grid-cols-2">
        <Card className="bg-slate-700 text-white shadow-lg">
          <CardContent>
            <Typography
              variant="h6"
              className="font-poppins text-center font-bold text-white mb-3"
            >
              Sales Overview
            </Typography>
            <div className="w-[50%] mb-4 mt-2">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="filter-label">Filter</InputLabel>
                <Select
                  labelId="filter-label"
                  value={filter}
                  onChange={handleFilterSelection}
                  label="Filter"
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div style={{ height: "300px" }}>
              <Line
                data={salesData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                    },
                  },
                  scales: {
                    x: {
                      grid: { display: false, color: "#ffff" },
                    },
                    y: {
                      grid: { color: "#ffff" },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-6 px-4">
        {/* Top Brands */}
        <Card className="shadow-lg border border-gray-200">
          <CardContent>
            <Typography
              variant="h6"
              className="font-poppins text-center font-bold text-white mb-3"
            >
              Top 5 Brands
            </Typography>
            <ul className="space-y-2">
              {topBrands && topBrands.length > 0 && (
                <>
                  {topBrands.map((brand, index) => (
                    <li
                      key={index}
                      className="flex justify-between text-sm bg-blue-500 px-3 py-3 rounded text-white"
                    >
                      <span className="font-poppins text-lg font-medium">
                        {brand.brandName}
                      </span>
                      <span className="bg-slate-900 py-2 px-2 text-white rounded">
                        {brand.totalSold} sold
                      </span>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card className="shadow-lg border border-gray-200">
          <CardContent>
            <Typography
              variant="h6"
              className="font-poppins text-center font-bold text-white mb-3"
            >
              Top 5 Categories
            </Typography>
            <ul className="space-y-2">
              {topCategories && topCategories.length > 0 && (
                <>
                  {topCategories.map((category, index) => (
                    <li
                      key={index}
                      className="flex justify-between text-sm bg-blue-500 px-3 py-3 rounded text-white"
                    >
                      <span className="font-poppins text-lg font-medium">
                        {category.categoryName}
                      </span>
                      <span className="bg-slate-900 py-2 px-2 text-white rounded">
                        {category.totalSold} sold
                      </span>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 px-4">
        {/* Top Products */}
        <Card className="bg-white">
          <CardContent>
            <Typography
              variant="h6"
              className="font-poppins text-center font-bold text-black mb-3"
            >
              Top 10 Products
            </Typography>
            <ul className="space-y-2">
              {topProducts && topProducts.length > 0 && (
                <>
                  {topProducts.map((product, index) => (
                    <li
                      key={index}
                      className="flex justify-between text-sm bg-gray-800 px-3 py-3 rounded text-white"
                    >
                      <div className="flex gap-3">
                        <span className="rounded w-[40px] h-[40px] flex items-center justify-center text-xs">
                          <img
                            className="rounded"
                            src={product.productDetails?.firstImage}
                            alt={product.productDetails?.name}
                          />
                        </span>
                        <span className="font-poppins text-lg font-medium">
                          {product.productDetails?.name}
                        </span>
                      </div>
                      <span>{product.totalSold} sold</span>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardPage;

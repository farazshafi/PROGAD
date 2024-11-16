import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { getTopSellingProductApi } from "../../api/productApi";

const DashboardPage = () => {
  const [topProducts, setTopProducts] = useState([]);

  const topCategories = [
    { name: "Electronics", totalSold: 500 },
    { name: "Fashion", totalSold: 450 },
    { name: "Home Appliances", totalSold: 400 },
    { name: "Books", totalSold: 350 },
    { name: "Sports", totalSold: 300 },
  ];

  const topBrands = [
    { name: "Brand X", totalSold: 600 },
    { name: "Brand Y", totalSold: 550 },
    { name: "Brand Z", totalSold: 500 },
    { name: "Brand A", totalSold: 450 },
    { name: "Brand B", totalSold: 400 },
  ];

  const fetchTopProducts = async () => {
    const result = await getTopSellingProductApi();
    setTopProducts(result);
  };

  useEffect(() => {
    fetchTopProducts();
  }, []);

  return (
    <>
      <Typography variant="h4" className="text-center mt-3 font-bold mb-6">
        Admin Dashboard
      </Typography>

      {/* Top Brands */}
      <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-6 px-4">
        <Card className="shadow-lg border border-gray-200">
          <CardContent>
            <Typography
              variant="h6"
              className="font-poppins text-center font-bold text-white mb-3"
            >
              Top 5 Brands
            </Typography>
            <ul className="space-y-2">
              {topBrands.map((brand, index) => (
                <li
                  key={index}
                  className="flex justify-between text-sm bg-blue-500 px-3 py-3 rounded text-white"
                >
                  <span>{brand.name}</span>
                  <span>{brand.totalSold} sold</span>
                </li>
              ))}
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
              {topProducts && topProducts.length > 0 && (
                <>
                  {topCategories.map((category, index) => (
                    <li
                      key={index}
                      className="flex justify-between text-sm bg-slate-100 px-3 py-3 rounded text-black"
                    >
                      <span>{category.name}</span>
                      <span>{category.totalSold} sold</span>
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
              {topProducts.map((product, index) => (
                <li
                  key={index}
                  className="flex justify-between text-sm bg-gray-800 px-3 py-3 rounded text-white"
                >
                  <div className="flex gap-3">
                    <span className="rounded w-[40px] h-[40px] flex items-center justify-center text-xs">
                      <img className="rounded" src={product.productDetails?.firstImage} alt={product.productDetails?.name} />
                    </span>
                    <span>{product.productDetails?.name}</span>
                  </div>
                  <span>{product.totalSold} sold</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardPage;

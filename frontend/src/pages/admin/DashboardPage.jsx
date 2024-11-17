import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { getTopSellingProductApi } from "../../api/productApi";
import { getTopSellingCategoriesApi } from "../../api/categoryApi";
import { getTopSellingBrandsApi } from "../../api/brandApi";

const DashboardPage = () => {
  const [topProducts, setTopProducts] = useState(null);
  const [topCategories, setTopCategories] = useState(null);
  const [topBrands, setTopBrands] = useState(null);

  const fetchTopProducts = async () => {
    const result = await getTopSellingProductApi();
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

  useEffect(() => {
    fetchTopProducts();
    fetchTopCategories();
    fetchTopBrands();
  }, []);

  return (
    <>
      <Typography variant="h4" className="text-center mt-3 font-bold mb-6">
        Admin Dashboard
      </Typography>

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
                      <span className="font-poppins text-lg font-medium">{brand.brandName}</span>
                      <span className="bg-slate-900 py-2 px-2 text-white rounded">{brand.totalSold} sold</span>
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
                      <span className="font-poppins text-lg font-medium">{category.categoryName}</span>
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
                        <span className="font-poppins text-lg font-medium">{product.productDetails?.name}</span>
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

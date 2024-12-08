import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import "./ProductGrid.css";

const ProductGrid = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex gap-4 overflow-x-auto custom-scrollbar">
          {products.map((product) => (
            <div
              key={product.productId}
              className="flex-shrink-0 w-64 p-4 bg-white rounded-lg shadow-lg cursor-pointer"
              onClick={() => navigate(`/product_details/${product.productId}`)}
            >
              <img
                src={product?.productDetails?.firstImage}
                alt={product?.productDetails?.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-2 text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/ mt-[-20px] bg-gray-800 text-white px-3 py-3 ml-2 rounded-full shadow-md hover:text-gray-700"
        onClick={() => {
          document.querySelector(".custom-scrollbar")?.scrollBy({
            left: -300,
            behavior: "smooth",
          });
        }}
      >
        <FaChevronCircleLeft />
      </button>

      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-3 mr-2 rounded-full shadow-md hover:bg-gray-700"
        onClick={() => {
          document.querySelector(".custom-scrollbar")?.scrollBy({
            left: 300,
            behavior: "smooth",
          });
        }}
      >
        <FaChevronCircleRight />
      </button>
    </div>
  );
};

export default ProductGrid;

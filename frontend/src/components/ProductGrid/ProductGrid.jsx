import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import "./ProductGrid.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ProductGrid = ({ products }) => {
  const navigate = useNavigate();
  const carouselRef = useRef(null); 
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = lastScrollY.current - currentScrollY;
    
      const items = carouselRef.current?.querySelectorAll(".product-item");
    
      if (items) {
        items.forEach((item, index) => {
          gsap.to(item, {
            x: `+=${scrollDelta * 0.7}`,
            duration: 0.3,
            ease: "power1.out",
          });
        });
      }
    
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto custom-scrollbar"
        >
          {products.map((product) => (
            <div
              key={product.productId}
              className="flex-shrink-0 w-64 p-4 bg-white rounded-lg shadow-lg cursor-pointer product-item" // Add "product-item" class
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

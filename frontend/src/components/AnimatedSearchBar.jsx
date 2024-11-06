import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectedProduct, selectedProductPage, setProducts } from "../features/product/productSlice";
import { getAllProductsApi } from "../api/productApi";

const AnimatedSearchBar = () => {
  const products = useSelector(selectedProduct);
  const page = useSelector(selectedProductPage)

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getAllProductsApi(page);
        setAllProducts(data.products);
        dispatch(setProducts(data.products));
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() === "") {
      dispatch(setProducts(allProducts));
      return;
    }

    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    dispatch(setProducts(filteredProducts));
  };

  return (
    <>
      <div className="p-3 overflow-hidden w-[50px] h-[50px] hover:w-[270px] bg-[#262626] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
        <div className="flex items-center justify-center fill-white">
          <svg
            className="ps-0"
            xmlns="http://www.w3.org/2000/svg"
            id="Isolation_Mode"
            data-name="Isolation Mode"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            onClick={handleSearchSubmit}
          >
            <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
        />
      </div>
    </>
  );
};

export default AnimatedSearchBar;

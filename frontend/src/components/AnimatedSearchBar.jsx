import React, { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setKeyword } from "../features/product/productSlice";

const AnimatedSearchBar = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const dispatch = useDispatch()


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!modalRef.current || !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleSearchSubmit = () => {
    dispatch(setKeyword(searchTerm))
    setIsModalOpen(false); // Close the modal after submitting
  };

  return (
    <>
      <div className="p-3 w-[50px] h-[50px] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center">
        <div className="flex items-center justify-center fill-white">
          <svg
            className="ps-0"
            xmlns="http://www.w3.org/2000/svg"
            id="Isolation_Mode"
            data-name="Isolation Mode"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            onClick={() => setIsModalOpen(true)}
          >
            <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
          </svg>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-40 h-fit top-10 flex justify-center z-50" ref={modalRef}>
          <div className="bg-white font-poppins w-[50%] p-6 flex gap-3 rounded-[10px] shadow-white shadow-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="outline-none text-[20px] border border-gray-300 p-1 rounded-3xl px-3 w-full"
            />
            <div className="flex justify-end">
              <div className="bg-[#262626] p-3 rounded">
                <FaSearch
                  className="text-xl text-white"
                  onClick={handleSearchSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnimatedSearchBar;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectedCart } from "../features/user/cartSlice";
import { selectedUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { findCouponsApi } from "../api/couponApi";
import OurButton from "./OurButton/OurButton";
import { FaCheck } from "react-icons/fa";

const CouponSection = ({summary, applyCoupon}) => {
  const cartItems = useSelector(selectedCart);
  const user = useSelector(selectedUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [availableCoupon, setAvailableCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [couponCategory, setCouponCategory] = useState([]);

  const handleApplyCoupon = () => {
    if (!availableCoupon) {
      toast.error("Invalid coupon code");
      return;
    }

    if (availableCoupon.categories && availableCoupon.categories.length > 0) {
      const isCategoryEligible = cartItems.some((item) =>
        availableCoupon.categories.includes(item.category._id)
      );

      if (!isCategoryEligible) {
        toast.error("Coupon not applicable for items in your cart");
        return;
      }
    }

    if (availableCoupon.minPurchasePrice > summary.totalAmount) {
      toast.error(
        `Minimum purchase price ${availableCoupon.minPurchasePrice} not met`
      );
      return;
    }
    applyCoupon(availableCoupon.discount)
    setIsApplied(true);
    toast.success("Coupon applied successfully");
  };

  const findCoupon = async () => {
    if (!user) {
      toast.warning("Please Login to apply coupon");
      navigate("/login");
    }
    try {
      setIsApplied(false);
      const result = await findCouponsApi(couponCode);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      setAvailableCoupon(result.data);
      setCouponCategory(result.data?.categories);
    } catch (err) {
      console.error("Error applying coupon:", err);
      toast.error(err.message || "Error applying coupon");
    }
  };

  return (
    <>
      {/* Coupon Input Section */}
      <div
        className="cart-coupoun"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
        className="text-black"
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            marginRight: "10px",
            fontSize: "16px",
          }}
        />
        <span onClick={findCoupon}>
          <OurButton text="Find" />
        </span>
      </div>

      {availableCoupon && (
        <div className="my-4 bg-[#262626] w-full rounded py-4 px-3 flex items-center">
          <p className="text-black bg-white py-1 px-2 rounded text-md font-poppins w-fit">
            {availableCoupon.name}
            <span className="ml-2 font-poppins text-[#ff7f11]">
              -{availableCoupon.discount}% Off
            </span>
          </p>
          <div
            onClick={handleApplyCoupon}
            className="text-white w-fit ml-auto cursor-pointer font-poppins bg-[#ff7f11] px-[10px] py-1 rounded hover:bg-orange-600 transition"
          >
            {isApplied ? <FaCheck /> : <>Apply</>}
          </div>
        </div>
      )}

      {!availableCoupon && <div className="h-5"></div>}
    </>
  );
};

export default CouponSection;

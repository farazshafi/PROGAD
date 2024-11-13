import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { toast } from "react-toastify";
import { getAvailableCouponApi } from "../../api/couponApi";

const CouponsPage = () => {
  const [coupons, setCoupons] = useState([]);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Code ${code} copied!`);
  };

  const fetchAvailableCoupons = async () => {
    try {
      const result = await getAvailableCouponApi();
      if (result?.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
          return;
        }
      }
      setCoupons(result.data);
    } catch (err) {
      console.error("Error fetching available coupons:", err);
      toast.error("Failed to fetch available coupons");
    }
  };

  useEffect(() => {
    fetchAvailableCoupons();
  }, []);

  if (coupons?.length < 1) {
    return (
      <>
        <Header />
        <h1 className="text-white text-center text-2xl font-poppins font-semibold mt-3">
          Unavailable Coupons
        </h1>
      </>
    );
  }

  return (
    <>
      <Header />
      <h1 className="text-white text-center text-2xl font-poppins font-semibold mt-3">
        Available Coupons
      </h1>

      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {coupons?.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center text-center"
            >
              <h2 className="font-bold text-lg font-poppins text-gray-800">
                {coupon.name}
              </h2>
              <div className="bg-[#FF7F11] w-full rounded mt-2">
                <p className="text-white text-xl font-semibold py-2">
                  {coupon.discount}% Off
                </p>
              </div>
              <p className="text-gray-600 mt-1">
                Code:{" "}
                <span className="font-mono text-gray-800">{coupon.code}</span>
              </p>
              <button
                onClick={() => copyCode(coupon.code)}
                className="bg-[#262626] text-white font-semibold mt-4 px-4 py-2 rounded hover:bg-grey-600 transition"
              >
                Copy Code
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CouponsPage;

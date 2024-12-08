import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../../components/Header/Header";
import ShippingSection from "../../../components/ShippingSection/ShippingSection";
import PaymentSection from "../../../components/PaymentSection/PaymentSection";
import PlaceOrderSection from "../../../components/PlaceOrderSection/PlaceOrderSection";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "../../../features/user/orderSlice";
import { logoutUser, selectedUser } from "../../../features/user/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { selectedCart } from "../../../features/user/cartSlice";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";

const CartProcess = () => {
  const user = useSelector(selectedUser);
  const cartItems = useSelector(selectedCart);

  const { component } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectedAddress = (address) => {
    dispatch(setShippingAddress(address));
    navigate("/cart_process/payment");
  };

  useEffect(() => {
    console.log(user);
    if (!user) {
      toast.error("Please login to proceed");
      navigate("/login");
    } else {
      if (!user?.isVerified) {
        toast.error("Please verify your email to proceed");
        dispatch(logoutUser());
        navigate("/login");
      }
    }
  }, []);

  useEffect(() => {
    if (cartItems && cartItems.length < 1) {
      navigate("/cart");
    }
  }, []);

  return (
    <>
      <Header />
      <Box
        sx={{
          backgroundColor: "#262626",
          padding: 3,
          borderRadius: 2,
          margin: "0 auto",
          color: "#FFFF",
        }}
      >
        <>
          <div className="border-b pb-2 border-gray-600">
            <ul className="flex flex-wrap -mb-px text-sm font-poppins text-center text-gray-100 dark:text-gray-400">
              <li>
                <button
                  className={`inline-flex text-[15px] items-center p-4 ${
                    component === "shipping"
                      ? "text-[#ff7f11] border-b-2 border-[#ff7f11]"
                      : ""
                  }`}
                  onClick={() => navigate("/cart_process/shipping")}
                >
                  <FaLocationCrosshairs className={`mr-2  ${
                      component === "shipping"
                        ? "text-2xl" : ""
                    }`} />
                  Shipping address
                </button>
              </li>
              <li>
                <button
                  className={`inline-flex text-[15px] items-center p-4 ${
                    component === "payment"
                      ? "text-[#ff7f11] border-b-2 border-[#ff7f11]"
                      : ""
                  }`}
                  onClick={() => navigate("/cart_process/payment")}
                >
                  <MdOutlinePayments
                    className={`mr-2  ${
                      component === "payment"
                        ? "text-2xl" : ""
                    }`}
                  />
                  Payment details
                </button>
              </li>
              <li>
                <button
                  className={`inline-flex text-[15px] items-center p-4 ${
                    component === "place_order"
                      ? "text-[#ff7f11] border-b-2 border-[#ff7f11]"
                      : ""
                  }`}
                  onClick={() => navigate("/cart_process/place_order")}
                >
                  <FaBoxOpen className={`mr-2  ${
                      component === "place_order"
                        ? "text-2xl" : ""
                    }`} />
                  Place order
                </button>
              </li>
            </ul>
          </div>
          {component === "shipping" && (
            <ShippingSection selectedAddress={handleSelectedAddress} />
          )}
          {component === "payment" && <PaymentSection />}
          {component === "place_order" && <PlaceOrderSection />}
        </>
      </Box>
    </>
  );
};

export default CartProcess;

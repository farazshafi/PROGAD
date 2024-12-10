import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { FiArrowRightCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectedUser } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import { getWalletDetailsApi } from "../../api/walletApi";

const WalletPage = () => {
  const user = useSelector(selectedUser);

  const [walletDetails, setWalletDetails] = useState([]);

  const navigate = useNavigate();

  const handleOrderDetails = (id) => {
    navigate(`/order_details/${id}`);
  };

  const fetchWalletDetails = async () => {
    try {
      const result = await getWalletDetailsApi(user._id);
      if (result.response) {
        const { status } = result.response;
        if (status === 500) {
          toast.error(result.response.data.message || "Cannot Fetch walledt");
          return;
        }
      }
      setWalletDetails(result);
    } catch (err) {
      toast.error("Server Error");
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    fetchWalletDetails();
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center p-4">
      <h1 className="text-center text-4xl font-bold mb-2">Wallet</h1>
      {walletDetails?.transactions?.length < 1 && (
        <p className="text-center font-poppins text-white opacity-50 mb-6">
          Wallet is Empty!. No Transaction Available
        </p>
      )}
      {walletDetails?.transactions?.length > 0 && walletDetails && (
        <>
          <Box className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
            <Typography
              variant="h5"
              className="text-center text-black font-poppins font-semibold mb-4"
            >
              Current Balance
            </Typography>
            <Typography
              variant="h3"
              className="text-center text-[#ff7f11] font-bold mb-4"
            >
              ₹{walletDetails?.balance?.toFixed(2)}
            </Typography>
            <div className="flex justify-center gap-4">
              {/* <Button variant="contained" color="primary" className="capitalize">Add Funds</Button>
          <Button variant="outlined" color="secondary" className="capitalize">Withdraw</Button> */}
            </div>
          </Box>

          {/* Transaction History */}
          <Box className="w-full max-w-md mx-auto">
            <Typography
              variant="h6"
              className="text-white opacity-50 font-semibold mb-4"
            >
              Recent Transactions
            </Typography>
            {walletDetails?.transactions?.map((transaction, index) => (
              <Card key={index} className="mb-4">
                <CardContent className="flex justify-between items-center">
                  <div>
                    <Typography>{transaction.description}</Typography>
                    <Typography variant="caption" className="text-gray-500">
                      {transaction.date}
                    </Typography>
                  </div>
                  <Typography
                    className={
                      transaction.type === "credit"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {transaction.type === "credit" ? "+" : "-"}₹
                    {transaction.amount.toFixed(2)}
                  </Typography>
                  <div onClick={() => handleOrderDetails(transaction.orderId)}>
                    <FiArrowRightCircle className="text-xl cursor-pointer" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}
    </div>
  );
};

export default WalletPage;

import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { FiArrowRightCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom"


const WalletPage = () => {
    const navigate = useNavigate()
  const transactions = [
    {
      type: "credit",
      amount: 200.0,
      description: "Refund Processed",
      date: "2024-11-10",
      orderId:"67339b16b95cb23d360213a5"
    },
    {
      type: "credit",
      amount: 150.0,
      description: "Refund Processed",
      date: "2024-11-08",
      orderId:"67339b16b95cb23d360213a5"
    },
  ];

  const handleOrderDetails = (id) =>{
    navigate(`/order_details/${id}`)
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-center text-4xl font-bold mb-2">Wallet</h1>
      <p className="text-center font-poppins text-white opacity-50 mb-6">
        Seamless spending, effortless saving.
      </p>

      {/* Balance Display Box */}
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
          $1,250.00
        </Typography>
        <div className="flex justify-center gap-4">
          {/* <Button variant="contained" color="primary" className="capitalize">Add Funds</Button>
          <Button variant="outlined" color="secondary" className="capitalize">Withdraw</Button> */}
        </div>
      </Box>

      {/* Transaction History */}
      <Box className="w-full max-w-md mx-auto">
        <Typography variant="h6" className="text-gray-700 font-semibold mb-4">
          Recent Transactions
        </Typography>
        {transactions.map((transaction, index) => (
          <Card key={index} className="mb-4">
            <CardContent className="flex justify-between items-center">
              <div>
                <Typography>{transaction.description}</Typography>
                <Typography variant="caption" className="text-gray-500">{transaction.date}</Typography>
              </div>
              <Typography className={transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'}>
                {transaction.type === 'credit' ? '+' : '-'} ${transaction.amount.toFixed(2)}
              </Typography>
              <div onClick={()=>handleOrderDetails(transaction.orderId)}>
                <FiArrowRightCircle className="text-xl cursor-pointer"/>
              </div>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default WalletPage;

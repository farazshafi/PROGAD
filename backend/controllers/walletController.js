import asyncHandler from "express-async-handler";
import Wallet from "../models/walletModel.js";

// @desc    get wallet details
// @route   GET /api/user/wallet/:userId
// @access  private
export const getWalletDetails = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const wallet = await Wallet.findOne({ userId })
    .select("balance _id transactions")
    .populate({
      path: "transactions.orderId",
      select: "orderId",
    });

  if (!wallet) {
    return res.status(201).json([]);
  }

  wallet.transactions = wallet.transactions.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const response = {
    balance: wallet.balance,
    transactions: wallet.transactions.map((transaction) => ({
      ...transaction.toObject(),
      orderId: transaction.orderId ? transaction.orderId.orderId : null,
    })),
  };

  res.status(200).json(response);
});

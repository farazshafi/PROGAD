import asyncHandler from "express-async-handler";
import Wallet from "../models/walletModel.js";

// @desc    get wallet details
// @route   GET /api/user/wallet/:userId
// @access  private
export const getWalletDetails = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const wallet = await Wallet.findOne({ userId }).select(
    "balance _id transactions"
  );

  if (!wallet) {
    return res.status(201).json([]);
  }

  await Wallet.updateMany(
    { "transactions.createdAt": { $exists: false } }, // Find transactions without createdAt
    { $set: { "transactions.$[].createdAt": new Date() } } // Set the current timestamp
  );
  

  wallet.transactions = wallet.transactions.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  

  res.status(200).json(wallet);
});

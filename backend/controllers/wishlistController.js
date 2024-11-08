import asyncHandler from "express-async-handler";
import Wishlist from "../models/wishlistModel.js";

// @desc    create a new wishlist
// @route   POST /api/wishlist/create_wishlist
// @access  private
export const createWishlist = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;
  // validation
  if (!userId || !productId) {
    return res.status(400).json({ message: "Invalid wishlist creation" });
  }

  const existWishlist = await Wishlist.findOne({ user: userId });

  if (existWishlist) {
    if (existWishlist.products.includes(String(productId))) {
      return res
        .status(400)
        .json({ message: "Product already exists in wishlist" });
    }
    existWishlist.products.push(productId);
    await existWishlist.save();
    return res
      .status(201)
      .json({ message: "Product added to wishlist successfully" });
  }

  await Wishlist.create({
    user: userId,
    products: [productId],
  });
  res.status(201).json({ message: "Wishlist created successfully" });
  return;
});

// @desc    get all wishlist
// @route   GET /api/wishlist/get_wishlist
// @access  private
export const getAllWishlist = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  // validation
  if (!userId) {
    return res.status(400).json({ message: "Invalid userId" });
  }
  const existWishlist = await Wishlist.find({ user: userId });
  if (existWishlist) {
    res.status(201).json({ products: existWishlist.products });
  } else {
    res.status(400).json({ message: "No wishlist found" });
  }
});

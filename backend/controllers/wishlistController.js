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
// @route   GET /api/wishlist/get_wishlist/:id
// @access  private
export const getAllWishlist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  if (!id) {
    return res.status(400).json({ message: "Invalid userId" });
  }
  const existWishlist = await Wishlist.findOne({ user: id }).populate(
    "products",
    "name id images discountPrice originalPrice"
  );
  if (existWishlist) {
    res.status(201).json({ wishlistedProducts: existWishlist?.products });
    return;
  }else{
    return res.status(200).json({wishlistedProducts:[]})
  }
});

// @desc    Delete a product from wishlist
// @route   DELETE /api/wishlist/delete_product
// @access  Private
export const deleteWishlistProduct = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;

  // Validation
  if (!userId || !productId) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const updatedWishlist = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $pull: { products: productId } },
    { new: true }
  );

  if (!updatedWishlist) {
    return res.status(404).json({ message: "Wishlist not found" });
  }

  const isProductRemoved = !updatedWishlist.products.includes(productId);

  if (isProductRemoved) {
    return res
      .status(200)
      .json({ message: "Removed from wishlist successfully" });
  } else {
    return res.status(404).json({ message: "Product not found in wishlist" });
  }
});

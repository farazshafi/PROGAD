import asyncHandler from "express-async-handler";
import { Product } from "../models/productModel.js";

// @desc    Create a new product
// @route   POST /api/product/create_product
// @access  private
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    originalPrice,
    discountPrice,
    images,
    totalStock,
    isPublished,
    category,
    hasVariants,
    variants,
    type,
    batteryLife,
    bluetoothVersion,
    noiseCancellation,
    warranty,
  } = req.body;

  if (
    !name ||
    !description ||
    !originalPrice ||
    !images ||
    !category ||
    (hasVariants && !variants)
  ) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const productData = {
    name,
    description,
    originalPrice,
    discountPrice,
    images,
    totalStock,
    isPublished,
    category,
    hasVariants,
    type,
    batteryLife,
    bluetoothVersion,
    noiseCancellation,
    warranty,
  };

  if (hasVariants) {
    productData.variants = variants.map((variant) => ({
      name: variant.name,
      originalPrice: variant.originalPrice,
      discountPrice: variant.discountPrice,
      stock: variant.stock,
      images: variant.images,
      color: variant.color,
      type: variant.type,
      batteryLife: variant.batteryLife,
      bluetoothVersion: variant.bluetoothVersion,
      isNoiseCancellationEnabled: variant.isNoiseCancellationEnabled,
      isDualPlayConnectionEnabled: variant.isDualPlayConnectionEnabled,
    }));
  }

  const product = await Product.create(productData);
  
  if (product) {
    res.status(201).json({ message: "Product created successfully" });
  } else {
    res.status(400).json({ message: "Failed to create product" });
  }
});

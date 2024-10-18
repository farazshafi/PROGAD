import asyncHandler from "express-async-handler";
import { Product } from "../models/productModel.js";

// @desc    Create a new product
// @route   POST /api/product/create_product
// @access  private
export const createProduct = asyncHandler(async (req, res) => {
  try {
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
      dualPlayConnection,
      warranty,
    } = req.body;

    // Basic validation
    if (!name || !description || !images || !category || (hasVariants && !variants)) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    if (!hasVariants && !originalPrice) {
      return res.status(400).json({ message: "Original price is required for products without variants" });
    }

    if (hasVariants && (!variants || variants.length === 0)) {
      return res.status(400).json({ message: "Please provide at least one variant" });
    }

    // Initialize the product data object
    const productData = {
      name,
      description,
      originalPrice: hasVariants ? undefined : Number(originalPrice),
      discountPrice: hasVariants ? undefined : Number(discountPrice),
      images,
      totalStock: hasVariants ? undefined : Number(totalStock),
      isPublished,
      category,
      hasVariants,
      type: hasVariants ? undefined : type, // Only add type if no variants
      batteryLife: type === "Bluetooth" && !hasVariants ? batteryLife : undefined,
      bluetoothVersion: type === "Bluetooth" && !hasVariants ? bluetoothVersion : undefined,
      noiseCancellation: type === "Bluetooth" && !hasVariants ? noiseCancellation : undefined,
      dualPlayConnection: type === "Bluetooth" && !hasVariants ? dualPlayConnection : undefined,
      warranty,
    };

    if (hasVariants) {
      productData.variants = variants.map((variant) => {
        const variantData = {
          name: variant.name,
          originalPrice: Number(variant.originalPrice),
          discountPrice: Number(variant.discountPrice) || 0,
          stock: Number(variant.stock),
          images: variant.images,
          color: variant.color,
          type: variant.type,
          warranty: variant.warranty,
        };

        if (variant.type === "Bluetooth") {
          variantData.batteryLife = variant.batteryLife;
          variantData.bluetoothVersion = variant.bluetoothVersion;
          variantData.isNoiseCancellationEnabled = variant.isNoiseCancellationEnabled;
          variantData.isDualPlayConnectionEnabled = variant.isDualPlayConnectionEnabled;
        }

        return variantData;
      });

      // Calculate total stock for variant-based products
      productData.totalStock = productData.variants.reduce(
        (acc, variant) => acc + variant.stock,
        0
      );
    }

    // Create the product
    const product = await Product.create(productData);
    if (!product) {
      return res.status(400).json({ message: "Product creation failed" });
    }
    console.log("product created")
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error.message);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid product data", error: error.errors });
    } else if (error.name === "MongoError" && error.code === 11000) {
      return res.status(400).json({ message: "Duplicate key error: A product with similar details already exists" });
    }
    res.status(500).json({ message: "Server error while creating product", error: error.message });
  }
});

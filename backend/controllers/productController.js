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
    dualPlayConnection,
    warranty,
  } = req.body;

  // Basic validation
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

  // If no variants, originalPrice must be provided
  if (!hasVariants && !originalPrice) {
    res.status(400);
    throw new Error("Original price is required for products without variants");
  }

  // If hasVariants is true, at least one variant must be provided
  if (hasVariants && (!variants || variants.length === 0)) {
    res.status(400);
    throw new Error("Please provide at least one variant");
  }

  // Initialize the product data object
  const productData = {
    name,
    description,
    originalPrice: hasVariants ? undefined : Number(originalPrice), // Ensure it's a number
    discountPrice: Number(discountPrice) || 0, // Ensure it's a number, default to 0 if not provided
    images,
    totalStock: hasVariants ? undefined : Number(totalStock), // Ensure it's a number
    isPublished,
    category,
    hasVariants,
    type: hasVariants ? undefined : type, // Only add type if no variants
    batteryLife: type === "Bluetooth" && !hasVariants ? batteryLife : undefined,
    bluetoothVersion:
      type === "Bluetooth" && !hasVariants ? bluetoothVersion : undefined,
    noiseCancellation:
      type === "Bluetooth" && !hasVariants ? noiseCancellation : undefined,
      dualPlayConnection:
      type === "Bluetooth" && !hasVariants ? dualPlayConnection : undefined,
    warranty,
  };

  // If the product has variants, populate the variants data
  if (hasVariants) {
    productData.variants = variants.map((variant) => {
      const variantData = {
        name: variant.name,
        originalPrice: Number(variant.originalPrice), // Ensure it's a number
        discountPrice: Number(variant.discountPrice) || 0, // Ensure it's a number
        stock: Number(variant.stock), // Ensure it's a number
        images: variant.images,
        color: variant.color,
        type: variant.type,
        warranty: variant.warranty,
      };

      // Add Bluetooth-specific fields if applicable
      if (variant.type === "Bluetooth") {
        variantData.batteryLife = variant.batteryLife;
        variantData.bluetoothVersion = variant.bluetoothVersion;
        variantData.isNoiseCancellationEnabled =
          variant.isNoiseCancellationEnabled;
        variantData.isDualPlayConnectionEnabled =
          variant.isDualPlayConnectionEnabled;
      }

      return variantData;
    });

    // Calculate total stock for variant-based products
    productData.totalStock = productData.variants.reduce(
      (acc, variant) => acc + variant.stock,
      0
    );
  }

  try {
    console.log("Request coming:", productData);

    const product = await Product.create(productData);

    if (product) {
      console.log("Product created");
      res
        .status(201)
        .json({ message: "Product created successfully", product });
    } else {
      res.status(400).json({ message: "Product creation failed" });
    }
  } catch (error) {
    console.error("Error creating product:", error.message); // Log error for debugging
    res.status(500).json({ message: "Server error while creating product" });
  }
});

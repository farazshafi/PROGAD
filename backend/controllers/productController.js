import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { promisify } from "util";
import asyncHandler from "express-async-handler";
import { Product } from "../models/productModel.js";

// Initialize S3 client
const s3 = new S3Client({ region: process.env.AWS_REGION });
const randomBytes = promisify(crypto.randomBytes);

const uploadImageToS3 = async (file) => {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex") + file.originalname;

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `progad/${imageName}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  // Upload to S3
  await s3.send(new PutObjectCommand(uploadParams));
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/progad/${imageName}`;
};

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
      totalStock,
      isPublished,
      category,
      hasVariants: hasVariantsString,
      variants,
      type,
      batteryLife,
      bluetoothVersion,
      noiseCancellation,
      dualPlayConnection,
      warranty,
    } = req.body;

    const hasVariants = hasVariantsString === "true";
    if (
      !name ||
      !description ||
      (hasVariants && (!variants || variants.length === 0))
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    if (!hasVariants && !originalPrice) {
      return res.status(400).json({
        message: "Original price is required for products without variants",
      });
    }

    if (hasVariants && (!variants || variants.length === 0)) {
      return res
        .status(400)
        .json({ message: "Please provide at least one variant" });
    }

    // Define arrays to hold image URLs
    const productImages = [];
    const variantImages = [];

    // Process product images
    if (req.files && req.files["images"]) {
      for (const file of req.files["images"]) {
        const imageUrl = await uploadImageToS3(file);
        productImages.push(imageUrl); // Push to productImages array
      }
    }

    // Process variant images
    if (req.files && req.files["variantImages"]) {
      for (const file of req.files["variantImages"]) {
        const imageUrl = await uploadImageToS3(file);
        variantImages.push(imageUrl);
      }
    }

    // Check if product images are empty
    if (productImages.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload at least one image" });
    }

    const productData = {
      name,
      description,
      originalPrice: hasVariants ? undefined : Number(originalPrice),
      discountPrice: hasVariants ? undefined : Number(discountPrice),
      images: productImages,
      totalStock: hasVariants ? undefined : Number(totalStock),
      isPublished,
      category,
      hasVariants,
      type: hasVariants ? undefined : type, // Only add type if no variants
      batteryLife:
        type === "Bluetooth" && !hasVariants ? batteryLife : undefined,
      bluetoothVersion:
        type === "Bluetooth" && !hasVariants ? bluetoothVersion : undefined,
      noiseCancellation:
        type === "Bluetooth" && !hasVariants ? noiseCancellation : undefined,
      dualPlayConnection:
        type === "Bluetooth" && !hasVariants ? dualPlayConnection : undefined,
      warranty,
    };

    // console.log("product data is getting ", productData)

    if (hasVariants) {
      productData.variants = variants.map((variant) => {
        const variantData = {
          name: variant.name,
          originalPrice: Number(variant.originalPrice),
          discountPrice: Number(variant.discountPrice) || 0,
          stock: Number(variant.stock),
          images: variant.images || [],
          color: variant.color,
          type: variant.type,
          warranty: variant.warranty,
        };

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

    // Create the product
    const product = await Product.create(productData);
    if (!product) {
      return res.status(400).json({ message: "Product creation failed" });
    }
    console.log("Product created successfully");
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error.message);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Invalid product data", error: error.errors });
    } else if (error.name === "MongoError" && error.code === 11000) {
      return res.status(400).json({
        message:
          "Duplicate key error: A product with similar details already exists",
      });
    }
    res.status(500).json({
      message: "Server error while creating product",
      error: error.message,
    });
  }
});

// @desc    get all product
// @route   GET /api/product/get_products
// @access  public
export const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ isPublished: true }).populate(
      "category",
      "_id name"
    );
    res.json(products);
  } catch (err) {
    console.error("Error getting products:", err.message);
    res.status(500).json({ message: "Server error while getting products" });
  }
});

// @desc    get all product
// @route   PATCH /api/product/handle_public_change/:id
// @access  public
export const handlePublicChange = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isPublished } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { isPublished },
      { new: true }
    );
    if (updatedProduct) {
      res.status(200).json({ product: updatedProduct });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (err) {
    console.error("Error getting products:", err.message);
    res.status(500).json({ message: "Server error while getting products" });
  }
});

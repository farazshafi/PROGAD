import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { promisify } from "util";
import asyncHandler from "express-async-handler";
import { Product } from "../models/productModel.js";
import Offer from "../models/offerModel.js";
import mongoose from "mongoose";
import Order from "../models/orderModel.js";

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
      // default product
      name,
      brand,
      description,
      originalPrice,
      discountPrice,
      totalStock,
      isPublished,
      material,
      category,
      warranty,
      color,
      isNewArrival,
      isFeatured,
      isBluetoothSupported: isBluetoothSupportedString,
      // if it suppot bluetooth
      batteryLife,
      bluetoothVersion,
      bluetoothRange,
      chargingTime,
      noiseCancellation: noiseCancellationSring,
      dualPlayConnection: dualPlayConnectionString,
      appControl: appControlString,
      waterResistant: waterResistantString,
      touchControl: touchControlString,
      multiDevice: multiDeviceString,
      hasVariants: hasVariantsString,
      // if it has variants
      variants,
    } = req.body;
    const images = req.files.images;

    const hasVariants = hasVariantsString === "true";
    const isBluetoothSupported = isBluetoothSupportedString === "true";
    const noiseCancellation = noiseCancellationSring === "true";
    const dualPlayConnection = dualPlayConnectionString === "true";
    const appControl = appControlString === "true";
    const waterResistant = waterResistantString === "true";
    const touchControl = touchControlString === "true";
    const multiDevice = multiDeviceString === "true";

    // validation
    if (
      !name ||
      !description ||
      !originalPrice ||
      !discountPrice ||
      !totalStock ||
      !isNewArrival ||
      !isPublished ||
      !isFeatured ||
      // !color ||
      !brand ||
      !category ||
      !warranty ||
      (isBluetoothSupported &&
        (batteryLife === undefined ||
          bluetoothVersion === undefined ||
          noiseCancellation === undefined ||
          appControl === undefined ||
          dualPlayConnection === undefined ||
          waterResistant === undefined ||
          multiDevice === undefined ||
          touchControl === undefined ||
          bluetoothRange === undefined ||
          chargingTime === undefined)) ||
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
        productImages.push(imageUrl);
      }
    }

    if (productImages.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload at least one image" });
    }

    const productData = {
      name,
      brand,
      description,
      originalPrice: Number(originalPrice),
      discountPrice: Number(discountPrice),
      totalStock: Number(totalStock),
      isPublished,
      material,
      category,
      warranty,
      images: productImages,
      isBluetoothSupported,
      hasVariants,
      isNewArrival,
      isFeatured,
    };

    if (isBluetoothSupported) {
      productData.batteryLife = batteryLife;
      productData.bluetoothVersion = bluetoothVersion;
      productData.bluetoothRange = bluetoothRange;
      productData.chargingTime = chargingTime;
      productData.noiseCancellation = noiseCancellation;
      productData.dualPlayConnection = dualPlayConnection;
      productData.appControl = appControl;
      productData.waterResistant = waterResistant;
      productData.touchControl = touchControl;
      productData.multiDevice = multiDevice;
    }

    if (hasVariants) {
      productData.variants = variants.map((variant) => {
        const variantData = {
          name: variant.name,
          discountPrice: Number(variant.discountPrice) || 0,
          stock: Number(variant.stock),
          images: variant.images || [],
          color: variant.color,
          material: variant.material,
          images: variant.images,
          isBluetoothSupported: variant.isBluetoothSupported,
        };

        if (variant.isBluetoothSupported) {
          variantData.noiseCancellation = variant.noiseCancellation;
          variantData.dualPlayConnection = variant.dualPlayConnection;
          variantData.waterResistant = variant.waterResistant;
          variantData.touchControl = variant.touchControl;
          variantData.multiDevice = variant.multiDevice;
          variantData.appControl = variant.appControl;
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const activeOffers = await Offer.find({
      status: "active",
      expirationDate: { $gte: new Date() },
    });

    const totalProducts = await Product.countDocuments({ isPublished: true });
    const products = await Product.find({ isPublished: true })
      .limit(limit)
      .skip(skip)
      .populate("category", "_id name");

    const transformedProducts = products.map((product) => {
      const relevantOffer = activeOffers.find(
        (offer) =>
          (offer.applyToProducts && offer.productIds.includes(product._id)) ||
          (offer.applyToCategories &&
            offer.categoryIds.includes(product.category._id))
      );

      let discountPrice = product.discountPrice;
      let discountValue = null;
      let discountType = null;

      if (relevantOffer) {
        discountType = relevantOffer.discountType;
        if (discountType === "percentage") {
          discountValue = `${relevantOffer.discount}%`;
          // discountPrice =
          //   product.discountPrice * (1 - relevantOffer.discount / 100);
        } else if (discountType === "fixed") {
          discountValue = `${relevantOffer.discount}`;
          // discountPrice = Math.max(
          //   0,
          //   product.discountPrice - relevantOffer.discount
          // );
        }
      }

      return {
        _id: product._id,
        name: product.name,
        image: product.images[0] || null,
        discountPrice: discountPrice.toFixed(2),
        originalPrice: product.originalPrice,
        discount: discountValue,
        discountType: discountType,
      };
    });

    res.json({
      products: transformedProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
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

// @desc    get  product by id
// @route   get /api/product/product_details/:id
// @access  public
export const getProductDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id)
      .select("-sold")
      .populate("category", "_id name")
      .populate("brand", "_id name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const relevantOffer = await Offer.findOne({
      status: "active",
      expirationDate: { $gte: new Date() },
      $or: [{ productIds: product._id }, { categoryIds: product.category._id }],
    });

    console.log("Relevant Offer: ", relevantOffer);

    let discountValue = 0;
    let discountPrice = product.discountPrice;
    let discountType = null;

    if (relevantOffer) {
      discountType = relevantOffer.discountType;

      if (discountType === "percentage") {
        discountValue = relevantOffer.discount;
        discountPrice = product.discountPrice * (1 - discountValue / 100);
      } else if (discountType === "fixed") {
        discountValue = relevantOffer.discount;
        discountPrice = product.discountPrice - discountValue;
      }
    }

    res.status(200).json({
      ...product.toObject(),
      discount:
        discountType === "percentage" ? `${discountValue}` : discountValue,
      discountType,
      discountPrice: discountPrice.toFixed(2),
    });
  } catch (err) {
    console.error("Error getting product details:", err.message);
    res
      .status(500)
      .json({ message: "Server error while getting product details" });
  }
});

// @desc    update product by id
// @route   PUT /api/product/update_product/:id
// @access  private admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    discountPrice,
    stock,
    warranty,
    isPublished,
    // if bluetooth supports
    isBluetoothSupported,
    noiseCancellation,
    dualPlayConnection,
    waterResistant,
    touchControl,
    multiDevice,
    appControl,
    batteryLife,
    bluetoothVersion,
    bluetoothRange,
    chargingTime,
  } = req.body;
  try {
    const product = await Product.findById(id);
    if (product) {
      product.name = name ?? product.name;
      product.description = description ?? product.description;
      product.discountPrice = discountPrice ?? product.discountPrice;
      product.totalStock = stock ?? product.totalStock;
      product.warranty = warranty ?? product.warranty;
      product.isPublished = isPublished ?? product.isPublished;
      // if bluetooth support
      if (isBluetoothSupported) {
        product.isBluetoothSupported =
          isBluetoothSupported ?? product.isBluetoothSupported;
        product.batteryLife = batteryLife ?? product.batteryLife;
        product.bluetoothVersion = bluetoothVersion ?? product.bluetoothVersion;
        product.bluetoothRange = bluetoothRange ?? product.bluetoothRange;
        product.chargingTime = chargingTime ?? product.chargingTime;
        product.noiseCancellation =
          noiseCancellation ?? product.noiseCancellation;
        product.dualPlayConnection =
          dualPlayConnection ?? product.dualPlayConnection;
        product.appControl = appControl ?? product.appControl;
        product.waterResistant = waterResistant ?? product.waterResistant;
        product.touchControl = touchControl ?? product.touchControl;
        product.multiDevice = multiDevice ?? product.multiDevice;
      } else {
        product.isBluetoothSupported =
          isBluetoothSupported ?? product.isBluetoothSupported;
      }
      await product.save();
      res.status(200).json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({ message: "Server error while updating product" });
  }
});

// @desc    Get sorted and paginated products
// @route   GET /api/product/sorted_products
// @access  public
export const getSortedProduct = asyncHandler(async (req, res) => {
  try {
    const { sortBy, page = 1, limit = 10 } = req.query;
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const skip = (pageInt - 1) * limitInt;

    // Define sorting criteria based on the sortBy parameter
    let sortCriteria = {};
    switch (sortBy) {
      case "lowToHigh":
        sortCriteria = { discountPrice: 1 };
        break;
      case "highToLow":
        sortCriteria = { discountPrice: -1 };
        break;
      case "newArrival":
        sortCriteria = { createdAt: -1 };
        break;
      case "Aa-Zz":
        sortCriteria = { name: 1 };
        break;
      case "zZ-aA":
        sortCriteria = { name: -1 };
        break;
      case "featured":
        sortCriteria = { isFeatured: -1 };
        break;
      default:
        return res.status(400).json({ message: "Invalid sort parameter" });
    }

    // Retrieve active offers for discount calculations
    const activeOffers = await Offer.find({
      status: "active",
      expirationDate: { $gte: new Date() },
    });

    // Get total count for pagination and fetch sorted, paginated products
    const totalProducts = await Product.countDocuments({ isPublished: true });
    const products = await Product.find({ isPublished: true })
      .sort(sortCriteria)
      .skip(skip)
      .limit(limitInt)
      .populate("category", "_id name");

    // Transform products to include discount information
    const transformedProducts = products.map((product) => {
      const relevantOffer = activeOffers.find(
        (offer) =>
          (offer.applyToProducts && offer.productIds.includes(product._id)) ||
          (offer.applyToCategories &&
            offer.categoryIds.includes(product.category._id))
      );

      let discountPrice = product.discountPrice;
      let discountValue = null;
      let discountType = null;

      if (relevantOffer) {
        discountType = relevantOffer.discountType;
        if (discountType === "percentage") {
          discountValue = `${relevantOffer.discount}%`;
          discountPrice =
            product.discountPrice * (1 - relevantOffer.discount / 100);
        } else if (discountType === "fixed") {
          discountValue = `${relevantOffer.discount}`;
          discountPrice = Math.max(
            0,
            product.discountPrice - relevantOffer.discount
          );
        }
      }

      return {
        _id: product._id,
        name: product.name,
        image: product.images[0] || null,
        discountPrice: discountPrice.toFixed(2),
        originalPrice: product.originalPrice,
        discount: discountValue,
        discountType: discountType,
      };
    });

    res.json({
      products: transformedProducts,
      currentPage: pageInt,
      totalPages: Math.ceil(totalProducts / limitInt),
      totalProducts,
    });
  } catch (err) {
    console.error("Error sorting and paginating products:", err.message);
    res.status(500).json({ message: "Server error while sorting products" });
  }
});

// @desc    get sorted product
// @route   GET /api/product/relatedProduct/category_id/:id
// @access  Public
export const getRelatedProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.find({ category: id });
    if (!product) {
      return res.status(404).json({ message: "No related product found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("Error related product:", err.message);
    res.status(500).json({ message: "Server error while related product" });
  }
});

// @desc    get all public products
// @route   GET /api/product/public_products
// @access  private admin
export const getAllPublicProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find({ isPublished: true }).select("name id");
    if (!product) {
      return res.status(404).json({ message: "No related product found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("Error related product:", err.message);
    res.status(500).json({ message: "Server error while related product" });
  }
});

// @desc    Get filtered products by categories and price range
// @route   GET /api/product/filter_products?
// @access  public
export const getFilteredProducts = asyncHandler(async (req, res) => {
  try {
    const { categories, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const skip = (pageInt - 1) * limitInt;

    const filterCriteria = { isPublished: true };

    if (categories) {
      const categoryArray = categories
        .split(",")
        .map((category) => new mongoose.Types.ObjectId(category));
      filterCriteria.category = { $in: categoryArray };
    }

    if (minPrice || maxPrice) {
      filterCriteria.discountPrice = {};
      if (minPrice) filterCriteria.discountPrice.$gte = Number(minPrice);
      if (maxPrice) filterCriteria.discountPrice.$lte = Number(maxPrice);
    }

    const activeOffers = await Offer.find({
      status: "active",
      expirationDate: { $gte: new Date() },
    });

    const totalProducts = await Product.countDocuments(filterCriteria);
    const products = await Product.find(filterCriteria)
      .skip(skip)
      .limit(limitInt)
      .populate("category", "_id name");

    const transformedProducts = products.map((product) => {
      const relevantOffer = activeOffers.find(
        (offer) =>
          (offer.applyToProducts && offer.productIds.includes(product._id)) ||
          (offer.applyToCategories &&
            offer.categoryIds.includes(product.category._id))
      );

      let discountPrice = product.discountPrice;
      let discountValue = null;
      let discountType = null;

      if (relevantOffer) {
        discountType = relevantOffer.discountType;
        if (discountType === "percentage") {
          discountValue = `${relevantOffer.discount}%`;
          discountPrice =
            product.discountPrice * (1 - relevantOffer.discount / 100);
        } else if (discountType === "fixed") {
          discountValue = `${relevantOffer.discount}`;
          discountPrice = Math.max(
            0,
            product.discountPrice - relevantOffer.discount
          );
        }
      }

      return {
        _id: product._id,
        name: product.name,
        image: product.images[0] || null,
        discountPrice: discountPrice.toFixed(2),
        originalPrice: product.originalPrice,
        discount: discountValue,
        discountType: discountType,
      };
    });

    res.json({
      products: transformedProducts,
      currentPage: pageInt,
      totalPages: Math.ceil(totalProducts / limitInt),
      totalProducts,
    });
  } catch (err) {
    console.error("Error filtering products:", err.message);
    res.status(500).json({ message: "Server error while filtering products" });
  }
});

// @desc    Get top 10 best selling product
// @route   GET /api/product/best_selling
// @access  private admin
export const getTopSellingProduct = asyncHandler(async (req, res) => {
  const topProductsAggregation = await Order.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.id",
        totalSold: { $sum: "$items.quantity" },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 10 },
  ]);

  const topProducts = await Promise.all(
    topProductsAggregation.map(async (product) => {
      const productDetails = await Product.findById(product._id);
      return {
        productId: product._id,
        totalSold: product.totalSold,
        productDetails: {
          name: productDetails?.name || null,
          firstImage: productDetails?.images?.[0] || null,
        },
      };
    })
  );
  if (topProducts.length === 0) {
    res.status(404).json({ message: "No best selling products found" });
    return;
  }
  res.status(200).json(topProducts);
});

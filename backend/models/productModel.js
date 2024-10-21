import mongoose from "mongoose";

// Rating Schema
const ratingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

// Variant Schema
const variantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    stock: {
      type: Number,
      default: 0,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Bluetooth", "Non-Bluetooth"],
      required: true,
    },
    batteryLife: {
      type: String,
      required: function () {
        return this.type === "Bluetooth";
      },
    },
    bluetoothVersion: {
      type: String,
      required: function () {
        return this.type === "Bluetooth";
      },
    },
    isNoiseCancellationEnabled: {
      type: Boolean,
      required: function () {
        return this.type === "Bluetooth";
      },
    },
    isDualPlayConnectionEnabled: {
      type: Boolean,
      required: function () {
        return this.type === "Bluetooth";
      },
    },
    warranty: {
      type: "string",
    },
  },
  { timestamps: true }
);

// Product Schema
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
    images: {
      type: [String],
      required: true,
    },
    totalStock: {
      type: Number,
      default: 10,
    },
    isPublished: {
      type: Boolean,
      default: true,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    ratings: {
      type: [ratingSchema],
      default: [],
    },
    hasVariants: {
      type: Boolean,
      default: false,
    },
    variants: {
      type: [variantSchema],
    },
    type: {
      type: String,
      enum: ["Bluetooth", "Non-Bluetooth"],
      required: function () {
        // Only required if there are no variants
        return !this.hasVariants;
      },
    },
    batteryLife: {
      type: String,
      required: function () {
        return this.type === "Bluetooth";
      },
    },
    bluetoothVersion: {
      type: String,
      required: function () {
        return this.type === "Bluetooth";
      },
    },
    noiseCancellation: {
      type: Boolean,
      required: function () {
        return this.type === "Bluetooth";
      },
    },
    dualPlayConnection: {
      type: Boolean,
      required: function () {
        return this.type === "Bluetooth";
      },
    },
    warranty: {
      type: String,
      default: "1 year",
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (this.hasVariants) {
    this.totalStock = this.variants.reduce(
      (acc, variant) => acc + variant.stock,
      0
    );
  }
  next();
});

// Models
const Product = mongoose.model("Product", productSchema);
const Rating = mongoose.model("Rating", ratingSchema);
export default Product
export { Product, Rating };

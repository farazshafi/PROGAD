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
    discountPrice: {
      type: Number,
      required: true,
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
    material:{
      type: String,
      required: true,
    },
    isBluetoothSupported: {
      type: Boolean,
      required: true,
    },
    noiseCancellation: {
      type: Boolean,
      required: function () {
        return this.isBluetoothSupported === true;
      },
    },
    dualPlayConnection: {
      type: Boolean,
      required: function () {
        return this.isBluetoothSupported === true;
      },
    },
    appControl: {
      type: Boolean,
      required: function () {
        return this.isBluetoothSupported === true;
      },
    },
    waterResistant: {
      type: Boolean,
      required: function () {
        return this.isBluetoothSupported === true;
      },
    },
    touchControl: {
      type: Boolean,
      required: function () {
        return this.isBluetoothSupported === true;
      },
    },
    multiDevice: {
      type: Boolean,
      required: function () {
        return this.isBluetoothSupported === true;
      },
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
    color: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true
    },
    discountPrice: {
      type: Number,
      required: true
    },
    images: {
      type: [String],
      required: true,
    },
    totalStock: {
      type: Number,
      default: 10,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
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
    brand:{
      type:String,
      required: true,
    },
    material:{
      type:String,
      required: function(){
        return !this.hasVariants
      },
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
    isBluetoothSupported: {
      type: Boolean,
      required: true,
    },
    batteryLife: {
      type: String,
      required: function () {
        return this.isBluetoothSupported === true;
      },
    },
    bluetoothVersion: {
      type: String,
      required: function () {
        return this.isBluetoothSupported === true;
      },
    },
    bluetoothRange: {
      type: String,
      required: function () {
        return this.isBluetoothSupported === true;
      },
    },
    chargingTime: {
      type: String,
      required: function () {
        return this.isBluetoothSupported === true;
      },
    },
    noiseCancellation: {
      type: Boolean,
      required: function () {
        return this.isBluetoothSupported === true;
      },
    },
    dualPlayConnection: {
      type: Boolean,
      required: function () {
        return this.isBluetoothSupported === true;
      },
    },
    appControl: {
      type: Boolean,
      required: function () {
        return this.isBluetoothSupported === true;
      },
    },
    waterResistant: {
      type: Boolean,
      required: function () {
        return this.isBluetoothSupported === true;
      },
    },
    touchControl: {
      type: Boolean,
      required: function () {
        return this.isBluetoothSupported === true;
      },
    },
    multiDevice: {
      type: Boolean,
      required: function () {
        return this.isBluetoothSupported === true;
      },
    },
    warranty: {
      type: String,
      default: "1 year",
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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
export default Product;
export { Product, Rating };

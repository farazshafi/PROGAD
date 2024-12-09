import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: { type: String, unique: true, required: true },
    couponDiscount: {
      type: Number,
      default: 0,
    },
    items: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        subTotal: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ["pending", "shipped", "delivered", "cancelled", "returned"],
      default: "pending",
    },
    tax: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    deliveryCost: {
      type: Number,
      default: 0,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cash on delivery", "razorpay", "wallet"],
      default: "cash on delivery",
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    cancelReason: {
      type: String,
      default: null,
    },
    returnReason: {
      type: String,
      default: null,
    },
    deliveredDate: {
      type: Date,
      default: null,
    },
    orderDate: { type: Date, default: Date.now },
    razorpayOrderId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

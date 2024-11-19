import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Coupon from "../models/couponModel.js";
import Product from "../models/productModel.js";
import razorpayInstance from "../config/razorpay.js";
import Wallet from "../models/walletModel.js";

// @desc    make a order
// @route   POST /api/order/make_order
// @access  private
export const makeOrder = asyncHandler(async (req, res) => {
  try {
    const {
      user,
      items,
      razorpayOrderId,
      status,
      couponDiscount,
      tax,
      deliveryCost,
      shippingAddress,
      paymentMethod,
      couponCode,
      totalPrice,
      paymentStatus,
    } = req.body;

    console.log("req body: ", req.body);

    if (
      !user ||
      !items ||
      !status ||
      !tax ||
      !shippingAddress ||
      !paymentMethod ||
      !paymentStatus
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let orderSubTotal = 0;
    const itemWithSubTotal = items.map((item) => {
      const itemSubTotal = item.price * item.quantity;
      orderSubTotal += itemSubTotal;
      return { ...item, subTotal: itemSubTotal };
    });

    if (paymentStatus === "paid") {
      for (const item of items) {
        const product = await Product.findById(item.id);
        if (!product) {
          return res.status(400).json({ message: "Product not found" });
        }

        if (product.stock < item.quantity) {
          return res.status(400).json({
            message: `Product ${product.name} has only ${product.stock} left`,
          });
        }

        product.totalStock -= item.quantity;
        product.sold += item.quantity;
        await product.save();
      }
    }

    const order = await Order.create({
      user,
      items: itemWithSubTotal,
      status,
      couponDiscount,
      tax,
      totalPrice,
      deliveryCost,
      subTotal: orderSubTotal,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      razorpayOrderId: paymentMethod === "Razorpay" ? razorpayOrderId : null,
    });

    res.status(201).json({
      message: "Order created successfully",
      orderId: order._id,
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @desc    later payment , in order details page
// @route   POST /api/order/later_payment
// @access  private
export const laterPayment = asyncHandler(async (req, res) => {
  const { razorpayOrderId, orderId } = req.body;
  const existingOrder = await Order.findById(orderId);

  if (!existingOrder) {
    return res.status(400).json({ message: "Order not found" });
  }

  existingOrder.paymentStatus = "paid" || existingOrder.paymentStatus;
  existingOrder.razorpayOrderId =
    razorpayOrderId || existingOrder.razorpayOrderId;
  await existingOrder.save();

  res.status(200).json({ message: "Payment Successful" });
});

// @desc    handling razorpay transaction
// @route   POST /api/order/create_razorpay_order
// @access  private
export const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { totalPrice } = req.body;

  try {
    const options = {
      amount: Math.round(totalPrice * 100),
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpayInstance.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: "Unable to create order" });
    }

    res.status(200).json({
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({ message: "Razorpay order creation failed" });
  }
});

// @desc    get all orders for user
// @route   GET /api/order/get_all_orders/userId/:id
// @access  private
export const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const allOrders = await Order.find({ user: id }).populate(
      "shippingAddress"
    );
    if (!allOrders) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(allOrders);
  } catch (err) {
    console.error("Error getting orders:", err.message);
    res.status(500).json({ message: "Server error while getting orders" });
  }
});

// @desc    get order by id
// @route   GET /api/order/get_order_details/:id
// @access  private
export const getOrderDetails = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const orderDetails = await Order.findById(id)
      .populate("shippingAddress")
      .populate("items.id", "images name");
    if (!orderDetails) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orderDetails);
  } catch (err) {
    console.error("Error getting orders:", err.message);
    res.status(500).json({ message: "Server error while getting orders" });
  }
});

// @desc    cancel order
// @route   GET /api/order/cancel_order/:id
// @access  private
export const cancelOrder = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { reason, status } = req.body;
    console.log("reason :", reason);

    const orderDetails = await Order.findById(id);
    if (!orderDetails) {
      return res.status(404).json({ message: "No orders found" });
    }
    if (!reason) {
      return res
        .status(400)
        .json({ message: "Please provide a cancellation reason" });
    }
    if (status === "Return") {
      orderDetails.status = "returned";
      orderDetails.returnReason = reason;
      orderDetails.paymentStatus = "refunded";
    } else {
      orderDetails.status = "cancelled";
      orderDetails.cancelReason = reason;
      if (orderDetails.paymentStatus !== "unpaid") {
        orderDetails.paymentStatus = "refunded";
      }
    }
    await orderDetails.save();
    if (
      orderDetails.paymentMethod === "razorpay" &&
      orderDetails.paymentStatus === "refunded"
    ) {
      console.log("eelk bernna test 2");
      let wallet = await Wallet.findOne({ userId: orderDetails.user });
      if (!wallet) {
        wallet = new Wallet({ userId: orderDetails.user });
      }
      const refundAmount = orderDetails.totalPrice;
      wallet.balance += refundAmount;
      console.log("order id", orderDetails._id);
      wallet.transactions.push({
        type: "credit",
        amount: refundAmount,
        description: `Refund for ${
          status === "Cancel" ? "canceled" : "Returned "
        } order`,
        orderId: orderDetails._id,
      });
      await wallet.save();
    }
    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (err) {
    console.error("Error getting orders:", err.message);
    res.status(500).json({ message: "Server error while getting orders" });
  }
});

// @desc    list all orders
// @route   GET /api/order/list_orders
// @access  private admin
export const listAllOrders = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalOrders = await Order.countDocuments();
    const allOrders = await Order.find()
      .populate("user", "_id name email")
      .limit(limit)
      .skip(skip);
    if (!allOrders) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json({
      allOrders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
    });
  } catch (err) {
    console.error("Error getting orders:", err.message);
    res.status(500).json({ message: "Server error while getting orders" });
  }
});

// @desc    update order status
// @route   PATCH /api/order/update_order_status/:id
// @access  private admin
export const updateStatus = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const orderDetails = await Order.findById(id);
    if (!orderDetails) {
      return res.status(404).json({ message: "No orders found" });
    }
    const validStatuses = ["pending", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    if (status === "delivered") {
      if (orderDetails.paymentMethod === "cash on delivery") {
        orderDetails.paymentStatus = "paid";
      } else if (
        orderDetails.paymentMethod === "razorpay" &&
        orderDetails.paymentStatus === "unpaid"
      ) {
        return res
          .status(400)
          .json({ message: "Cannot Delivery a product if Unpaid" });
      }
    }
    if (status === "delivered") {
      orderDetails.deliveredDate = new Date();
    }

    orderDetails.status = status;
    await orderDetails.save();
    res.status(200).json({ message: "Order status updated successfully" });
  } catch (err) {
    console.error("Error getting orders:", err.message);
    res.status(500).json({ message: "Server error while getting orders" });
  }
});

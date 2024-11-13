import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Coupon from "../models/couponModel.js";
import Product from "../models/productModel.js";
import razorpayInstance from "../config/razorpay.js";

// @desc    make a order
// @route   POST /api/order/make_order
// @access  private
export const makeOrder = asyncHandler(async (req, res) => {
  try {
    console.log("make order is coming");
    const {
      user,
      items,
      status,
      tax,
      deliveryCost,
      shippingAddress,
      paymentMethod,
      couponCode,
      totalPrice,
    } = req.body;

    console.log("my req body", req.body);

    // Validation
    if (
      !user ||
      !items ||
      !status ||
      !tax ||
      !shippingAddress ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let orderSubTotal = 0;
    const itemWithSubTotal = items.map((item) => {
      const itemSubTotal = item.price * item.quantity;
      orderSubTotal += itemSubTotal;
      return { ...item, subTotal: itemSubTotal };
    });

    // Check product stock and update stock
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

    let razorpayOrderId = null;

    // Create Razorpay order if payment method is Razorpay
    if (paymentMethod === "razorpay") {
      const numericTotalPrice = parseFloat(totalPrice) || 0; // Ensures numeric value
      const totalAmount = Math.round(numericTotalPrice * 100); // Convert to paise (integer)

      console.log("Total amount:", totalAmount);

      const razorpayOrder = await razorpayInstance.orders.create({
        amount: totalAmount, // Correct amount in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
      });

      if (!razorpayOrder || !razorpayOrder.id) {
        return res
          .status(500)
          .json({ message: "Failed to create Razorpay order" });
      }

      razorpayOrderId = razorpayOrder.id;
    }

    // Create the order in the database
    const order = await Order.create({
      user,
      items: itemWithSubTotal,
      status,
      tax: tax || 0,
      totalPrice,
      deliveryCost: deliveryCost || 0,
      subTotal: orderSubTotal,
      shippingAddress,
      paymentMethod,
      razorpayOrderId,
      paymentStatus: paymentMethod === "razorpay" ? "paid" : "unpaid",
    });

    const addUserToCoupon = await Coupon.findOne({ code: couponCode });
    if (!addUserToCoupon) {
      return res.status(400).json({ message: "Coupon code not found" });
    }

    if (!Array.isArray(addUserToCoupon.users)) {
      addUserToCoupon.appliedUsers = [];
    }

    addUserToCoupon.appliedUsers.push(user);
    addUserToCoupon.limit -= 1;
    await addUserToCoupon.save();


    res.status(201).json({
      message: "Order created successfully",
      orderId: razorpayOrderId || order._id,
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
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

    const orderDetails = await Order.findById(id);
    if (!orderDetails) {
      return res.status(404).json({ message: "No orders found" });
    }
    orderDetails.status = "cancelled";

    await orderDetails.save();
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

    orderDetails.status = status;
    await orderDetails.save();
    res.status(200).json({ message: "Order status updated successfully" });
  } catch (err) {
    console.error("Error getting orders:", err.message);
    res.status(500).json({ message: "Server error while getting orders" });
  }
});

import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// @desc    make a order
// @route   POST /api/order/make_order
// @access  private
export const makeOrder = asyncHandler(async (req, res) => {
  try {
    const {
      user,
      items,
      status,
      tax,
      deliveryCost,
      shippingAddress,
      paymentMethod,
    } = req.body;
    console.log("Payload:", {
      user,
      items,
      status,
      tax,
      deliveryCost,
      shippingAddress,
      paymentMethod,
    });

    // validation
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

    const totalPrice = orderSubTotal + (tax || 0) + (deliveryCost || 0);

    for (const item of items) {
      const product = await Product.findById(item.id);
      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({
            message: `Product ${product.name} has only ${product.stock} left`,
          });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    await Order.create({
      user,
      items: itemWithSubTotal,
      status,
      tax: tax || 0,
      totalPrice: totalPrice,
      deliveryCost: deliveryCost || 0,
      subTotal: orderSubTotal,
      shippingAddress,
      paymentMethod,
    });

    res.status(201).json({ message: "Order created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @desc    get all orders for user
// @route   GET /api/order/get_all_orders/userId/:id
// @access  private
export const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const allOrders = await Order.find({user:id}).populate("shippingAddress")
    if (!allOrders) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(allOrders)
    
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

    const orderDetails = await Order.findById(id).populate("shippingAddress").populate("items.id", "images name")
    if (!orderDetails) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orderDetails)
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

    const orderDetails = await Order.findById(id)
    if (!orderDetails) {
      return res.status(404).json({ message: "No orders found" });
    }
    orderDetails.status = "cancelled"
    await orderDetails.save()
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
   const allOrders = await Order.find().populate("user","_id name email")
    if (!allOrders) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(allOrders)
  } catch (err) {
    console.error("Error getting orders:", err.message);
    res.status(500).json({ message: "Server error while getting orders" });
  }
});
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

      if(product.stock < item.quantity){
        return res.status(400).json({ message: `Product ${product.name} has only ${product.stock} left` });
      }

      product.totalStock -= item.quantity
      await product.save()
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

import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "node:dns";
import { faker } from "@faker-js/faker";

import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Address from "../models/addressModel.js";
import Order from "../models/orderModel.js";

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

await mongoose.connect(
  "mongodb+srv://farazpachu777:Pachumongodb@cluster0.udcke.mongodb.net/progad?retryWrites=true&w=majority&appName=Cluster0",
);

const statuses = [
  "pending",
  "pending",
  "pending",
  "shipped",
  "shipped",
  "delivered",
  "delivered",
  "delivered",
  "delivered",
  "cancelled",
  "returned",
];

const paymentMethods = ["cash on delivery", "razorpay", "wallet"];

const cancelReasons = [
  "Changed my mind",
  "Ordered by mistake",
  "Found a better price",
  "Delivery taking too long",
];

const returnReasons = [
  "Damaged product",
  "Wrong item delivered",
  "Not as expected",
  "Quality issue",
];

const seedOrders = async () => {
  try {
    await Order.deleteMany({});
    console.log("Existing orders removed.");

    const users = await User.find({ role: "customer" });
    const products = await Product.find({ isPublished: true });
    const addresses = await Address.find({});

    if (!users.length || !products.length || !addresses.length) {
      console.log("Users, Products or Addresses not found.");
      process.exit(1);
    }

    const orders = [];

    for (const product of products) {
      product.sold = 0;
    }

    const ORDER_COUNT = 150;

    for (let i = 0; i < ORDER_COUNT; i++) {
      const user = faker.helpers.arrayElement(users);

      const address = addresses.find(
        (a) => a.user.toString() === user._id.toString(),
      );

      if (!address) continue;

      const numberOfItems = faker.number.int({ min: 1, max: 4 });

      const selectedProducts = faker.helpers.arrayElements(
        products,
        numberOfItems,
      );

      const items = [];
      let subTotal = 0;

      for (const product of selectedProducts) {
        const quantity = faker.number.int({ min: 1, max: 3 });

        const itemTotal = product.discountPrice * quantity;

        items.push({
          id: product._id,
          quantity,
          price: product.discountPrice,
          subTotal: itemTotal,
        });

        subTotal += itemTotal;

        // Increase sold count only
        product.sold += quantity;
      }

      const deliveryCost = faker.helpers.arrayElement([0, 40, 60, 80]);
      const tax = Math.round(subTotal * 0.05);

      const couponDiscount = faker.datatype.boolean(0.25)
        ? faker.helpers.arrayElement([100, 200, 300, 500])
        : 0;

      const totalPrice = subTotal + tax + deliveryCost - couponDiscount;

      const status = faker.helpers.arrayElement(statuses);

      let paymentStatus = "paid";

      if (status === "pending") paymentStatus = "unpaid";
      if (status === "cancelled") paymentStatus = "refunded";

      orders.push({
        user: user._id,
        orderId: `ORD-${faker.string.alphanumeric(10).toUpperCase()}`,
        items,
        couponDiscount,
        status,
        tax,
        deliveryCost,
        subTotal,
        totalPrice,
        shippingAddress: address._id,
        paymentMethod: faker.helpers.arrayElement(paymentMethods),
        paymentStatus,
        cancelReason:
          status === "cancelled"
            ? faker.helpers.arrayElement(cancelReasons)
            : null,
        returnReason:
          status === "returned"
            ? faker.helpers.arrayElement(returnReasons)
            : null,
        deliveredDate:
          status === "delivered" ? faker.date.recent({ days: 30 }) : null,
        orderDate: faker.date.between({
          from: new Date("2026-01-01"),
          to: new Date(),
        }),
        razorpayOrderId: faker.datatype.boolean(0.7)
          ? `order_${faker.string.alphanumeric(14)}`
          : null,
      });
    }

    await Order.insertMany(orders);

    for (const product of products) {
      await product.save();
    }

    console.log(`${orders.length} orders created.`);
    console.log("Product sold counts updated.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedOrders();

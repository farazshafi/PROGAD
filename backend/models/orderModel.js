import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true,
  },
  items:[
    {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity:{
            type: Number,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        subTotal:{
            type:Number,
            required:true
        }
    }
  ],
  status:{
    type: String,
    required: true,
    enum: ["pending", "processing", "shipped", "delivered", "canceled"],
    default: "pending"
  },
  tax:{
    type: Number,
    default: 0
  },
  totalPrice:{
    type: Number,
    required: true
  },
  deliveryCost:{
    type: Number,
    default:0
  },
  subTotal:{
    type: Number,
    required: true
  },
  shippingAddress:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true
  },
  paymentMethod:{
    type: String,
    required: true,
    enum: ["cash on delivery", "paypal", "credit card"],
    default: "cash on delivery"
  },
  paymentStatus:{
    type: String,
    required: true,
    enum: ["unpaid", "paid", "refunded"],
    default: "unpaid"
  },
  orderDate: { type: Date, default: Date.now },
},{timestamps:true});


const Order = mongoose.model("Order", orderSchema);

export default Order;
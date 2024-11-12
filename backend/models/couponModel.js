import mongoose from "mongoose"

const couponSchema = mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    appliedUsers:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default:[]
    },
    code:{
        type: String,
        required: true,
        unique: true
    },
    discount:{
        type: Number,
        required: true,
        min: 0,
        max: 70
    },
    expirationDate:{
        type: Date,
        required: true,
        default: Date.now() + 30*24*60*60*1000 // 30 days
    },
    limit:{
        type: Number,
        required: true,
        default: 100,
    },
    minPurchasePrice:{
        type: Number,
        required: true,
        default: 3000
    },
    status:{
        type: String,
        required: true,
        enum: ["active", "inactive"],
        default: "active"
    },
    categories:{
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
    },
    description:{
        type: String,
        required: true,
    }
})

const Coupon = mongoose.model("Coupon",couponSchema)

export default Coupon
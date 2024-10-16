import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    isPublished:{
        type: Boolean,
        default: true
    }
},{ timestamps: true })

const Category = mongoose.model("Category",categorySchema)
export default Category;
import mongoose from "mongoose";


const brandSchema = mongoose.Schema(
    {
      name:{
        type: String,
        required: true,
        unique: true
      },
      description: {
        type: String,
        required: true,
      },
      isPublished:{
        type: Boolean,
        default: true,
      }
    },
    { timestapms: true }
  );
  

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;

import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },

    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true, 
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    deals: {
      type: Boolean,
      default: false,
    },

    brand: String,

    description: String,

    images: [String],

    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

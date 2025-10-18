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

    regularPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    salePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    hasSalePrice : Boolean,
    taxable : Boolean,
    sku : String,

    shortDescription : String,
    fullDescription : String,
    brand: String,

    images: [{
      url : String,
      public_id : String,
    }],

    inStock: {
      type: Boolean,
      default: true,
    },

    stockUnit : String,
    weight : String,
    dimensions : String,
  },
  { timestamps: true }
);

productSchema.index({ owner: 1, sku: 1 }, { unique: true })

productSchema.pre('save', function (next) {
  if (this.sku) {
    this.sku = this.sku.toUpperCase();
  }
  next();
});

export const Product =  mongoose.model("Product", productSchema);

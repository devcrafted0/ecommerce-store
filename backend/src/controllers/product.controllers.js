import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Product } from "../models/product.models.js";
import { User } from "../models/user.models.js";

const getProduct = asyncHandler(async(req , res)=>{
  const product = await Product.findById(req.params.id);
  
  if(!product){
    throw new ApiError(400, 'Product not found');
  }
  res.status(200).json(new ApiResponse(200 , product))
})

// For the users profile page so that the user can get the products
const getAllProducts = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  const user = await User.findById(userId);

  if(user.role !== 'seller'){
    throw new ApiError(400, 'User is not a seller');
  }

  const query = {};
  if (userId) {
    query.owner = userId;
  }

  const products = await Product.find(query);
  res.status(200).json(new ApiResponse(200 , products));
});

const publishProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    shortDescription,
    fullDescription,
    regularPrice,
    sku,
    stockUnit,
    weight,
    dimensions,
    brand,
  } = req.body;

  const taxable = req.body.taxable === "true";
  const inStock = req.body.inStock === "true";

  const hasSalePrice = req.body.hasSalePrice === "true";
  const salePrice = req.body.salePrice?.trim() || "";

  const fieldsToBeCheckedForEmpty = {
    name,
    category,
    brand,
    shortDescription,
    fullDescription,
    regularPrice,
    sku,
    stockUnit,
    dimensions,
    weight,
  };

  for (const [key, _] of Object.entries(fieldsToBeCheckedForEmpty)) {
    const str = key.charAt(0).toUpperCase() + key.slice(1);

    if (!(`${key}` in req.body)) {
      throw new ApiError(400, `${str} is Undefined`);
    }

    if (fieldsToBeCheckedForEmpty[key].trim() === "") {
      throw new ApiError(400, `Please Enter a valid ${str}`);
    }
  }

  // For Checking the fields
  // res.status(200)
  // .json(new ApiResponse(200 , 'No field is empty or undefined'));

  if (hasSalePrice && salePrice === "") {
    throw new ApiError(400, "Please enter a valid sale price");
  }

  if (salePrice === "0" || regularPrice === "0") {
    throw new ApiError(400, "Please enter a valid price");
  }

  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "Please upload at least one image");
  }

  if (req.files.length > 5) {
    throw new ApiError(400, "You can upload up to 5 images only");
  }

  for (const file of req.files) {
    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      throw new ApiError(400, `${file.originalname} exceeds 5MB size limit`);
    }
  }

  const isSameSKU = await Product.findOne({
    owner: req.user._id,
    sku: sku.toUpperCase(),
  });

  if (isSameSKU) {
    throw new ApiError(404, "Product with same SKU Already exists.");
  }

  const uploadResults = [];

  // Upload all files in parallel (faster and cleaner)
  const uploadPromises = req.files.map(async (file) => {
    // Optional: file type validation (only images)
    if (!file.mimetype.startsWith("image/")) {
      throw new ApiError(400, `Invalid file type for ${file.originalname}`);
    }

    try {
      const cloudRes = await uploadOnCloudinary(file.path);
      return {
        url: cloudRes.secure_url,
        public_id: cloudRes.public_id,
      };
    } catch (err) {
      console.error(`Error uploading ${file.originalname}:`, err);
      throw new ApiError(500, `Failed to upload ${file.originalname}`);
    }
  });

  const results = await Promise.all(uploadPromises);

  try {
    await Product.create({
      owner: req.user._id,
      name,
      category,
      regularPrice,
      salePrice,
      hasSalePrice,
      taxable,
      sku,
      shortDescription,
      fullDescription,
      brand,
      inStock,
      stockUnit,
      weight,
      dimensions,
      images: results,
    });
    res
      .status(200)
      .json(new ApiResponse(200, "Product Successfully Published"));
  } catch (err) {
    if (err.code === 11000) {
      throw new ApiError(
        409,
        "Product with same SKU already exists for this user"
      );
    }
    throw err;
  }
});

const uploadImage = asyncHandler(async (req , res) => {
  const cloudRes = await uploadOnCloudinary(req.file.path);
  // console.log(cloudRes);
  res.status(200).json(cloudRes);
})

const editProduct = asyncHandler(async (req , res) => {
  const { id } = req.params;

  console.log(req.params , req.body);

  const isOwner = await Product.findOne({owner : req.user._id , _id : id});

  if(!isOwner){
    throw new ApiError(400 , 'Not a valid user');
  }

  const {
    name,
    category,
    shortDescription,
    fullDescription,
    regularPrice,
    sku,
    stockUnit,
    weight,
    dimensions,
    brand,
    images,
    taxable,
    inStock,
    hasSalePrice,
    salePrice
  } = req.body;

  // const taxable = req.body.taxable === "true";
  // const inStock = req.body.inStock === "true";

  // const hasSalePrice = req.body.hasSalePrice === "true";
  // const salePrice = req.body.salePrice?.trim() || "";

  const fieldsToBeCheckedForEmpty = {
    name,
    category,
    brand,
    shortDescription,
    fullDescription,
    // regularPrice,
    sku,
    stockUnit,
    dimensions,
    weight,
  };

  for (const [key, _] of Object.entries(fieldsToBeCheckedForEmpty)) {
    const str = key.charAt(0).toUpperCase() + key.slice(1);

    if (!(`${key}` in req.body)) {
      throw new ApiError(400, `${str} is Undefined`);
    }

    if (fieldsToBeCheckedForEmpty[key].trim() === "") {
      throw new ApiError(400, `Please Enter a valid ${str}`);
    }
  }

  // For Checking the fields
  // res.status(200)
  // .json(new ApiResponse(200 , 'No field is empty or undefined'));

  if (hasSalePrice && salePrice === "") {
    throw new ApiError(400, "Please enter a valid sale price");
  }

  if (salePrice === "0" || regularPrice === "0") {
    throw new ApiError(400, "Please enter a valid price");
  }
  
  if(isOwner.sku === sku){

  } else {
    const isSameSKU = await Product.findOne({
      owner: req.user._id,
      sku: sku.toUpperCase(),
    });
    
    if (isSameSKU) {
      throw new ApiError(404, "Product with same SKU Already exists.");
    }
  }

  if(images.length <= 0){
    throw new ApiError(400 , 'Prodcut must contain some images')
  }

  if(images.length > 5){
    throw new ApiError(400 , 'Prodcut can not exceed 5 images');
  }

  try {
    await Product.findByIdAndUpdate(id , {
      owner: req.user._id,
      name,
      category,
      regularPrice,
      salePrice,
      hasSalePrice,
      taxable,
      sku,
      shortDescription,
      fullDescription,
      brand,
      inStock,
      stockUnit,
      weight,
      dimensions,
      images,
    });
    res
      .status(200)
      .json(new ApiResponse(200, "Product Successfully Changed"));
  } catch (err) {
    if (err.code === 11000) {
      throw new ApiError(
        409,
        "Product with same SKU already exists for this user"
      );
    }
    throw err;
  }
})

const deleteProduct = asyncHandler(async (req , res) => {
  const { id } = req.params;

  const response = await Product.deleteOne({_id : id  , owner : req.user._id});

  if(!response){
    throw new ApiError(400 , 'Not a valid request');
  }

  res.status(200).json(new ApiResponse(200, {} ,'Product Deleted'))
});

export { publishProduct, getAllProducts, getProduct , uploadImage , editProduct , deleteProduct };
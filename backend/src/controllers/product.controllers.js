import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Product } from "../models/product.models.js";
import { User } from "../models/user.models.js";

const getProducts = async (req, res) => {
  try {
    const {
      category = "",
      deals,
      minPrice = 0,
      maxPrice = 0,
      page = 1,
      limit = 20,
    } = req.body;

    const filters = {};

    // ✅ Category: only apply if non-empty
    if (category.trim() !== "") {
      filters.category = category.trim();
    }

    // ✅ Deals: include both true and false
    if (typeof deals === "boolean") {
      filters.deals = deals;
    }

    // ✅ Price: handle numeric 0 properly
    const hasMin = minPrice !== undefined && minPrice !== 0;
    const hasMax = maxPrice !== undefined && maxPrice !== 0;

    if (hasMin && hasMax) {
      filters.price = { $gte: minPrice, $lte: maxPrice };
    } else if (hasMin) {
      filters.price = { $gte: minPrice };
    } else if (hasMax) {
      filters.price = { $lte: maxPrice };
    }

    const products = await Product.find(filters)
      .sort({ price: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, count: products.length, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

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

export { publishProduct, getAllProducts };

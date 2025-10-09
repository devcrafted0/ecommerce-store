import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    fullName: {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    role: {
      type: String,
      enum: ["seller", "user", "admin"],
      default: "user",
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);

/* 

----> Seller Rights <----  
1. Publish A Product
2. Recieve the orders
3. set the status of the orders
4. remove the products 
5. add videos (videos wil be published like youtube and not just for the products) of their products for demo
6. ⚠ Cannot switch back to the user mode for security rights
7. While Uploading the videos can be able to attach the product link of their own published products
8. Seller can both purchase and sell the things

----> Seller things <----
1. Seller can recive the reviews from the users
2. views , like , comments to their videos
3. get ratings
4. Reports from the users

----> User Rights <----
1. User can Follow to the seller
2. User can watch the videos
3. give likes , comments , views
4. give reviews to the recieved products
5. also can switch to the seller at any time
6. whitelist the products so that show up on the videos
7. can visit the products page
8. Only be able to purchase the things

----> User things <----

1. User cannot published the video

*/
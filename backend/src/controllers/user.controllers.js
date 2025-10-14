import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'
import * as crypto from 'crypto';
import { sendOtpEmail } from '../utils/sendEmail.js'

const generateRefreshAndAccessToknes = async (userId) => {
  try {

    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave : false});
    
    return {refreshToken , accessToken}

  } catch (error) {
    throw new ApiError(500 , "Something went wrong while generating tokens");
  }
}

const registerUser = asyncHandler(async (req, res) => {
  const { email, firstname, lastname, password, username } = req.body;

  if ([email, firstname , lastname, password, username].some((field) => field?.trim() === "")){
    throw new ApiError(400, "All Fields Are Required");
  }

  if (!email.includes("@")) {
    throw new ApiError(400, "Enter a valid email");
  }

  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new ApiError(409, "Account Already Exists.");
  }

  const existingUsername = await User.findOne({ username : username.toLowerCase() });

  if (existingUsername) {
    throw new ApiError(409, "Username already exists.");
  }

  const fullName = {firstname , lastname};
  
  const vibrantColors = [
  "F44336", "E91E63", "9C27B0", "673AB7", "3F51B5", "2196F3",
  "03A9F4", "009688", "4CAF50", "8BC34A", "CDDC39", "FFC107",
  "FF9800", "FF5722", "795548", "607D8B",
]
  const randomColor = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];

  const firstLetter = username.charAt(0).toUpperCase();

  const defaultAvatar = `https://ui-avatars.com/api/?name=${firstLetter}&length=1&background=${randomColor}&color=ffffff`;

  // 6-Digit OTP Setup
  const otp = crypto.randomInt(100000, 999999).toString();

  const user = await User.create({
    fullName,
    avatar: defaultAvatar,
    coverImage: 'No Cover Image',
    email,
    password,
    username: username.toLowerCase(),
    otp,
    otpExpires: Date.now() + 5 * 60 * 1000, // 5 minutes
  });

  // await sendOtpEmail(email, otp);

  return res.status(201).json({message: "OTP sent to your email for verification" });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -otp -otpExpires"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  const objectToReturn = new ApiResponse(201, createdUser, "User Registered Successfully")

  return res.status(201).json(objectToReturn);
});

const loginUser  = asyncHandler(async (req,res) => {
  const {email , password} = req.body;

  if(!email || !password){
    throw new ApiError(400 , 'Email/usernam and Password is required')
  }

  const isEmail = email.includes("@");

  const user = await User.findOne( isEmail ? { email } : { username: email });

  if(!user){
    throw new ApiError(400, "Account not exists")
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if(!isPasswordValid){
    throw new ApiError(401, 'Invalid Credentials');
  }

  if (!user.isVerified){
    return res.status(401).json({
      success : false,
      message : 'Please verify your account first',
      isVerified : false
    })
  }

  const {accessToken , refreshToken} = await generateRefreshAndAccessToknes(user._id);

  const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

  const options = {
    httpOnly : true,
    secure : true,
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken , options)
  .json(
    new ApiResponse(
      200, 
      {user : loggedInUser , accessToken , refreshToken}, 
      'User Logged In Successfully')
  )
})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {refreshToken : undefined}
    },
    {
      new : true
    }
  )

  const options = {
    httpOnly : true,
    secure : true,
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options).json(
    new ApiResponse(200, {}, "User Logged Out")
  )
});

const getAnyUser = asyncHandler(async(req , res)=>{
  
  const user = await User.findById(req.params.id).select('-password -refreshToken -updatedAt -otp -otpExpires -email -watchHistory -isVerified');
  // const user = await User.aggregate([
  //   {
  //     $match : {_id : new mongoose.Types.ObjectId(req.params.id)}
  //   }, 
  //   {
  //     $lookup : {
  //       from : 'videos',
  //       localField : '_id',
  //       foreignField : 'owner',
  //       as : 'videos'
  //     }
  //   },
  //   {
  //     $project: {
  //       password: 0,
  //       refreshToken: 0,
  //       updatedAt: 0,
  //       otp: 0,
  //       otpExpires: 0,
  //       email: 0,
  //       watchHistory: 0,
  //       isVerified: 0,
  //     }
  //     }
  // ]);

  if(!user){
    throw new ApiError(400, 'User not found');
  }
  res.status(200).json(new ApiResponse(200 , user))
})

const switchToSeller = asyncHandler(async (req , res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { role: 'seller' },
    { new: true }  // returns the updated document
  ).select('-password -refreshToken');

  res.status(200).json(new ApiResponse(200, user , 'Switched To Seller Mode.'));

})

const refreshAccessToken = asyncHandler(async (req , res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if(!incomingRefreshToken){
    throw new ApiError(401, 'Unauthorized request');
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken , process.env.REFRESH_TOKEN_SECRET);
  
    const user = await User.findById(decodedToken?._id);
    
    if(!user){
      throw new ApiError(401 , 'Invalid Refresh Token');
    }
  
    if(incomingRefreshToken !== user?.refreshToken){
      throw new ApiError(401, 'Refresh Token is expired or used')
    }
  
    const options = {
      httpOnly : true,
      secure : true,
    }
  
    const {accessToken , refreshToken} = await generateRefreshAndAccessToknes(user._id);
    
    res.status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
      200, 
      { accessToken , refreshToken},
      'Access Token Refreshed'
     )
    )
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh Token")
  }

})

const changeCurrentPassword = asyncHandler(async (req , res) => {
  const {oldPassword , newPassword} = req.body;

  const user = User.findById(req.user?._id);

  const isPasswordCorrect = user.isPasswordCorrect(oldPassword);

  if(!isPasswordCorrect){
    throw new ApiError(401 , 'Invalid Password');
  }

  user.password = newPassword;
  user.save({validateBeforeSave : false});

  return res.status(200)
  .json(new ApiResponse(200, {}, 'Password Change successfully'));
})

const getCurrentUser = asyncHandler(async (req , res) => {
  return res.status(200).json(new ApiResponse(200, req.user , "User Fetched Successfully"));
})

const updateCurrentUser = asyncHandler(async (req ,res) => {
  const {fullName , email} = req.body;

  if(!fullName || !email){
    throw new ApiError(401 , 'All Fields Are Required')
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set : {
        fullName, email
      }
    },
    {
      new : true
    }
  ).select('-password');

  return res
  .status(200)
  .json(
    new ApiResponse(200, 'Account details updated successfully')
  )
  
})

const updateUserAvatar = asyncHandler(async (req , res) => {b 

  const avatarLocalPath = req.file?.path;
  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is missing")
  }
  
  const avatar = uploadOnCloudinary(avatarLocalPath);
  if(!avatar.url){
    throw new ApiError(400, "Error while uploading Avatar on the cloudinary")
  }
  
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{avatar : avatar?.url}
    },
    {
      new : true
    }
  ) .select('-password');

  return res.status(200).json(
    new ApiResponse(200, user, "Avatar Changed.")
  )
})

const updateUserCoverImage = asyncHandler(async (req , res) => {b 

  const coverImageLocalPath = req.file?.path;
  if(!coverImageLocalPath){
    throw new ApiError(400, "Cover Image file is missing")
  }
  
  const coverImage = uploadOnCloudinary(coverImageLocalPath);
  if(!coverImage.url){
    throw new ApiError(400, "Error while uploading cover image on the cloudinary")
  }
  
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{coverImage : coverImage?.url}
    },
    {
      new : true
    }
  ) .select('-password');

  return res.status(200).json(
    new ApiResponse(200, user, "Avatar Changed.")
  )
})

const getUserChannelProfile = asyncHandler(async (req , res) => {
  const {username} = req.params;

  if(!username?.trim()){
    throw new ApiError(400, 'Username is missing');
  }

  const channel = await User.aggregate([
    {
      $match: {
        username : username?.toLowerCase()
      }
    },
    {
      $lookup: {
        from : "subscriptions",
        localField : "_id",
        foreignField : "channel",
        as : "subscribers"
      }
    },
    {
      $lookup : {
        from : "subscriptions",
        localField: "_id",
        foreignField : "subscriber",
        as : "toSubscribed"
      }
    },
    {
      $addFields : {
        isSubscribed : {
          $cond : {
            if : {$in : [req.user?._id, "$subscribers.subscriber"]},
            then : true,
            else : false,
          }
        },
        subscribers : {
          $size : "$subscribers"
        },
        toSubscribed : {
          $size : "$toSubscribed"
        }
      }
    },
    {
      $project: {
        fullName : 1,
        username : 1,
        email : 1,
        avatar:1,
        coverImage : 1,
        isSubscribed : 1,
        subscribers : 1,
        toSubscribed : 1,
      }
    }
  ]);

  if(!channel?.length){
    throw new ApiError(404, "Channel Does not exists")
  }

  return res
  .status(200)
  .json(
    new ApiResponse(200 , channel[0], "User Channel Fetched Successfully")
  )
  
})

// OTP Setups

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = await req.body;

    if (!email) {
      return res.status(400).json({ message: "Email or username is required" });
    }
    
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const user = await User.findOne(isEmail ? { email } : { username: email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "User already verified" });

    if (user.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.otpExpires < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email or username is required" });
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const user = await User.findOne(isEmail ? { email } : { username: email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const emailConfirm = user.email;

    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    try {
      await sendOtpEmail(emailConfirm, otp);
    } catch (mailErr) {
      console.error("Email send failed:", mailErr.message);
      return res.status(500).json({ message: "Failed to send OTP email" });
    }
    res.status(201).json({ message: "New OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export { registerUser, loginUser,  logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateCurrentUser, updateUserAvatar, updateUserCoverImage, getUserChannelProfile , getAnyUser, switchToSeller };


/*

// For later file handeling
let avatarLocalPath;

  if(req.files && Array.isArray(req.files.avatar)){
    avatarLocalPath = req.files?.avatar[0]?.path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar File Is Required");
  }

  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  let coverImage = {
    url : 'No Cover Image',
  };

  if (coverImageLocalPath) {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
  }

  if (!avatar) {
    throw new ApiError(400, "Error While Uploading Avatar file");
  }
*/
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'

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

  const avatarLocalPath = req.files?.avatar[0]?.path;

  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar File Is Required");
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

  const fullName = {firstname , lastname};

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  const objectToReturn = new ApiResponse(201, createdUser, "User Registered Successfully")

  return res.status(201).json(objectToReturn);
});

const loginUser  = asyncHandler(async (req,res) => {
  const {username , email , password} = req.body;

  if (!(username || email)) {
    throw new ApiError(400, 'Username or email is required');
  }

  const user = await User.findOne({
    $or : [{username}, {email}],
  })

  if(!user){
    throw new ApiError(400, 'User not exists');
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if(!isPasswordValid){
    throw new ApiError(401, 'Invalid Credentials');
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
  return res.status(200).json(new ApiResponse(200, res.user , "User Fetched Successfully"));
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


export { registerUser, loginUser,  logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateCurrentUser, updateUserAvatar, updateUserCoverImage, getUserChannelProfile };
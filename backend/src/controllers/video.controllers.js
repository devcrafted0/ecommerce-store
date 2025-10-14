import { Video } from "../models/Video/video.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadVideo = asyncHandler(async (req , res) => {
    const cloudRes = await uploadOnCloudinary(req.file.path);
    res.json({ videoUrl: cloudRes.secure_url , duration : cloudRes.duration });
})

const postVideo = asyncHandler(async (req , res) => {
    const {title , description , videoUrl , thumbnailUrl , duration} = req.body;
    
    if(!title || !description || !videoUrl || !thumbnailUrl || !duration){
        throw new ApiError(400, 'All fields are required');
    }

    const owner = req.user._id;
    
    await Video.create({
        title , description , videoUrl , thumbnailUrl , duration , owner
    })

    return res.status(201).json(new ApiResponse(201, {}, 'Video uploaded sucessfully'));
})

export {uploadVideo, postVideo};
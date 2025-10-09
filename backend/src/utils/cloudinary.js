import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Checking For Path
        if(!localFilePath) return null;

        // Uplaoding the file
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type : 'auto',
        })

        // Remove the local file on server if it is uploaded on the server
        fs.unlinkSync(localFilePath);

        return response;
        
    } catch (error) {
        // Remove the local file on server even if it is not uploaded on the server
        fs.unlink(localFilePath); 
        console.log('Error While Uploading File', error);
        return null;
    }
}

export {uploadOnCloudinary};
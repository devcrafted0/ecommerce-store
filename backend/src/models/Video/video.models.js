import mongoose , { Schema } from "mongoose";

const videoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
    },
    duration: {
        type: Number, // optional: in seconds
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
}, {timestamps : true})

export const Video = mongoose.model("Video", videoSchema);
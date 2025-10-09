import mongoose , { Schema } from "mongoose";

const videoSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    views : {
        type : Schema.Types.ObjectId,
        ref : 'View'
    },
    likes : {
        type : Schema.Types.ObjectId,
        ref : 'Likes'
    },
    comments : {
        type : Schema.Types.ObjectId,
        ref : 'Comments'
    },
    dislikes : {
        type : Schema.Types.ObjectId,
        ref : 'Dislikes'
    },
    

}, {timestamps : true})

export const Video = mongoose.model("Video", videoSchema);
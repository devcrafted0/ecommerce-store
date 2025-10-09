import mongoose,{Schema} from "mongoose";

const commentsSchema = new Schema({
    video : {
        type : Schema.Types.ObjectId,
        ref : 'Video'
    },
    commentBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})

export const Comments = mongoose.model('Comments', commentsSchema);
import mongoose,{Schema} from "mongoose";

const dislikesSchema = new Schema({
    video : {
        type : Schema.Types.String,
        ref : 'Video'
    },
    dislikeBy : {
        type : Schema.Types.String,
        ref : 'User'
    }
})

export const Dislikes = mongoose.model('Dislikes', dislikesSchema);
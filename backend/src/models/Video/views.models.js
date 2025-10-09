import mongoose , {Schema} from "mongoose";

const viewsSchema = new Schema({
    video : {
        type : Schema.Types.ObjectId,
        ref : 'Video'
    },
    viewer : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
});

export const View = mongoose.model('View', viewsSchema);
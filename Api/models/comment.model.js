import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,

    }
   ,
    blogid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Blog'
    },
    comment:{
        type: String,
        required: true,
        trim: true,
        
    }  
   
}, {timestamps:true})



const Comment = mongoose.model('Comment', commentSchema, "comments");

export default Comment;
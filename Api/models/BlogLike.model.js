import mongoose, {Schema} from "mongoose";

const likeSchema = new Schema({
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
   
   
}, {timestamps:true})



const BlogLike = mongoose.model('BlogLike', likeSchema , "bloglikes");

export default BlogLike;
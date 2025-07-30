import mongoose, {Schema} from "mongoose";

const blogSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,

    }
   ,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Category'
    },
    title:{
        type: String,
        required: true,
        trim: true,
        
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    blogContent: {
        type: String,
        required: true,
        trim: true

    },

    featuredImage: {
         type: String,
        required: true,
        trim: true
    }
   
}, {timestamps:true})



const Blog = mongoose.model('Blog', blogSchema, "blogs");

export default Blog;
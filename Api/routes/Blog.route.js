import express, { Router } from 'express';
import { addBlog, deleteBlog, editBlog,  getBlog, getRelatedBlog, getRelatedbycategory, search, showAllBlog, updateBlog } from '../controllers/Blog.controller.js';
import upload from '../config/multer.js';
import { authenticate } from '../middleware/authenticate.js';


const BlogRoute = express.Router();



BlogRoute.post("/add", authenticate, upload.single('file'), addBlog )
BlogRoute.put("/update/:blogid",  authenticate,upload.single('file'), updateBlog)
BlogRoute.get("/edit/:blogid", authenticate, editBlog )
BlogRoute.delete("/delete/:blogid", authenticate, deleteBlog )

// BlogRoute.get("/blogs", showAllBlog)

BlogRoute.get("/get-all",  showAllBlog)
BlogRoute.get("/get-blog/:slug", getBlog)
BlogRoute.get("/get-related-blog/:category/:blog", getRelatedBlog)
BlogRoute.get("/get-blog-by-category/:category", getRelatedbycategory)
BlogRoute.get("/search", search)


export default BlogRoute;

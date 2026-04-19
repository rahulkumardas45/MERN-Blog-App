import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js"
import { encode } from 'entities'
import Blog from "../models/blog.model.js";
import Category from "../models/category.model.js";
import redisClient from "../config/redis.js";

export const addBlog = async (req, res, next)=>{
    try {
        const data = JSON.parse(req.body.data)

        let featuredImage= ''

        if(req.file){
          
            // Upload an image
             const uploadResult = await cloudinary.uploader
               .upload(
                 req.file.path,
                 { folder: 'YT-MERN-BLOG', resource_type: 'auto'}
               )
               .catch((error) => {
                  next(handleError(500, error.message))
               });
            
            featuredImage = uploadResult.secure_url
          
        }
        

        const blog = await Blog.create({
            author: data.author,
            category: data.category,
            title: data.title,
            slug: data.slug,
            featuredImage: featuredImage,
            blogContent: encode(data.blogContent)
        })

        await blog.save()

        res.status(200)
        .json({
            success: true,
            message: "Blog created successfully"
        })


    } catch (error) {
        next(handleError(500, error.message))
        
    }

}

export const editBlog = async (req, res, next)=>{
    try {
        const {blogid}= req.params
        const blog = await Blog.findById(blogid).populate('category', 'name')

        if(!blog){
            next(handleError(404, 'Data not found.'))
        }

        res.status(200)
        .json({
            blog
        })


    } catch (error) {
        next(handleError(500, error.message))
        
    }

}

export const updateBlog = async (req, res, next)=>{
    try {
        const {blogid}= req.params
          const data = JSON.parse(req.body.data)

        let featuredImage= ''

        if(req.file){
          
            // Upload an image
             const uploadResult = await cloudinary.uploader
               .upload(
                 req.file.path,
                 { folder: 'YT-MERN-BLOG', resource_type: 'auto'}
               )
               .catch((error) => {
                  next(handleError(500, error.message))
               });
            
            featuredImage = uploadResult.secure_url
          
        }
        
        const blog = await Blog.findByIdAndUpdate(blogid,{
            $set:{
                category: data.category,
                title:data.title,
                slug: data.slug,
                blogContent: encode(data.blogContent) ,
                featuredImage: featuredImage

            }
        })

        await blog.save()
    
        res.status(200)
        .json({
            success: true,
            message: "Blog updated successfully"
        })


    } catch (error) {
        next(handleError(500, error.message))
        
    }

}

export const deleteBlog = async (req, res, next)=>{
    try {
        const {blogid} = req.params
        await Blog.findByIdAndDelete(blogid)
        res.status(200)
        .json({
            success: true,
            message: "Blog deleted successfully"
            })
        

    } catch (error) {
        next(handleError(500, error.message))
        
    }

}
// redis added in show all blog api for caching the data and improving the performance of the application
export const showAllBlog = async (req, res, next)=>{
    try {
const cached = await redisClient.get("allBlogs");

    if (cached) {
      console.log("⚡ From Redis");
      return res.status(200).json({ blog: JSON.parse(cached) });
    }

   const blog = await Blog.find().populate('author', 'name  avatar role')
   .populate('category', 'name slug')
   .sort({ createdAt: -1})
   .lean().exec()
 
     await redisClient.setEx("allBlogs", 60, JSON.stringify(blog)); // 1 min

    res.status(200) 
    .json({
        blog
    })


    } catch (error) {
        next(handleError(500, error.message))
        
    }

}

// redis added in getblog api for caching the data and improving the performance of the application
export const getBlog = async(req, res, next)=>{
   try {
     const {slug} = req.params

// 1. Check Redis first
    const cached = await redisClient.get(`blog:${slug}`);
    if (cached) {
      return res.status(200).json({ blog: JSON.parse(cached) });
    }
 
     const blog = await Blog.findOne({slug})
     .populate('author', 'name avatar role')
     .populate('category', 'name slug')
     .lean().exec()

      if(!blog){
        return next(handleError(404, 'Blog data not found.'))
      }
     // 3. Store in Redis (TTL = 1 hour)
    await redisClient.setEx(`blog:${slug}`, 3600, JSON.stringify(blog));


     res.status(200)
     .json({
         blog
     })
   } catch (error) {
      next(handleError(500, error.message))
   }
}


export const getRelatedBlog = async(req, res, next)=>{
   try {
     const {category, blog} = req.params
     const categoryData = await Category.findOne({slug: category})
  if(!categoryData){
    return next(handleError(404, 'category data not found.'))
  }
  const categoryId = categoryData._id

     const relatedBlog = await Blog.find({ category: categoryId, slug:{ $ne: blog} }).lean().exec()
     res.status(200)
     .json({
         relatedBlog
     })
   } catch (error) {
      next(handleError(500, error.message))
   }
}


export const getRelatedbycategory = async(req, res, next)=>{
   try {
     const {category} = req.params
     const categoryData = await Category.findOne({slug: category})
  if(!categoryData){
    return next(handleError(404, 'category data not found.'))
  }
  const categoryId = categoryData._id

     const blog = await Blog.find({ category: categoryId }).populate('author', 'name  avatar role').populate('category', 'name slug').sort({ createdAt: -1}).lean().exec()
     res.status(200)
     .json({
         blog,
         categoryData
     })
   } catch (error) {
      next(handleError(500, error.message))
   }
}

// redis added in search api for caching the data and improving the performance of the application
export const search = async(req, res, next)=>{
   try {
     const {q} = req.query
     
  const cached = await redisClient.get(`search:${q}`);
    if (cached) {
      console.log("⚡ From Redis");
      return res.status(200).json({ blog: JSON.parse(cached) });
    }



     const blog = await Blog.find({ title: { $regex: q, $options: 'i'}})
     .populate('author', 'name  avatar role')
     .populate('category', 'name slug')
     .sort({ createdAt: -1})
     .lean().exec()

     await redisClient.setEx(key, 300, JSON.stringify(blog)); // 5 min

     res.status(200)
     .json({
         blog,
        
     })
   } catch (error) {
      next(handleError(500, error.message))
   }
}

// export const getAllBlogs = async (req, res, next)=>{
//     try {
   
     

//  const blog = await Blog.find().populate('author', 'name  avatar role').populate('category', 'name slug').sort({ createdAt: -1}).lean().exec()
 
    
//     res.status(200) 
//     .json({
//         blog
//     })


//     } catch (error) {
//         next(handleError(500, error.message))
        
//     }

// }

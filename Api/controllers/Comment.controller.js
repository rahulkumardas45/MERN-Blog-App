import { handleError } from "../helpers/handleError.js"
import Comment from "../models/comment.model.js"

export const addComment = async(req, res, next)=>{

   try {
     const { user, blogid, comment} = req.body

     const commentdata = await Comment.create({
           user: user,
           blogid: blogid,
           comment: comment
     })

     await commentdata.save()

     res.status(200)
     .json({
        success: true,
        message: 'comment add successfully',
        comment: commentdata
     })


   } catch (error) {
    next(handleError(500, error.message))
   }
    



}

export const getComments = async(req, res, next)=>{

   try {
     const { blogid } = req.params
const comments = await Comment.find({blogid}).populate('user','name avatar').sort({createdAt: -1}).lean().exec()

     res.status(200)
     .json({
      
       comments
     })


   } catch (error) {
    next(handleError(500, error.message))
   }
    



}


export const commentCount = async(req, res, next)=>{

   try {
     const { blogid } = req.params
const commentnumber = await Comment.countDocuments({blogid})


     res.status(200)
     .json({
      
       commentnumber
     })


   } catch (error) {
    next(handleError(500, error.message))
   }

  }

  export const getAllComments = async(req, res, next)=>{

   try {
 
    const comments = await Comment.find().populate('blogid', 'title').populate('user', 'name')
  
     res.status(200)
     .json({
      comments
     })


   } catch (error) {
    next(handleError(500, error.message))
   }

  }


   export const deleteComment = async(req, res, next)=>{

   try {
    const {commentid} = req.params
   const comments = await Comment.findByIdAndDelete(commentid)
     res.status(200)
     .json({
      success: true,
      message: 'Comment deleted successfully'
     })


   } catch (error) {
    next(handleError(500, error.message))
   }

  }
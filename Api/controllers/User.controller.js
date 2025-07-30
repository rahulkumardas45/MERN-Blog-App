import { handleError } from "../helpers/handleError.js"
import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import cloudinary from "../config/cloudinary.js"


export const getUser = async (req, res, next)=>{
    try {
        const {userid} = req.params
      const user =  await User.findOne({_id: userid}).lean().exec()
      if(!user){
        next(handleError(400, "User not found"))
      }

 res.status(200).json({
    success: true,
    message: "user data found",
    user
 })
      

    } catch (error) {
        next(handleError(500, "Internal server error"))
        
    }
}

export const updateUser= async(req, res, next)=>{

  try {
 const data = JSON.parse(req.body.data)
   const { userid} = req.params

   const user = await User.findById(userid)

   user.name = data.name
   user.email = data.email
   user.bio = data.bio

if(data.password  && data.password.length >= 8){
   const hashedPassword =  bcryptjs.hashSync(data.password)
   user.password = hashedPassword
}


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
    
    user.avatar = uploadResult.secure_url
  
}

await user.save();

const newUser = user.toObject({getters: true});
delete newUser.password; // Remove password from user object


    res.status(200).json({
    success: true,
    message: "Data updated.",
    user:newUser
    
    
 })
    
  } catch (error) {
    next(handleError(500, error.message))
  }

}


export const getAllUser = async (req, res, next)=>{
    try {
        
      const users =  await User.find().sort({ createdAt: -1})
      if(!users){
        next(handleError(400, "User not found"))
      }

 res.status(200).json({
    success: true,
    message: "user data found",
    users
 })
      

    } catch (error) {
        next(handleError(500, "Internal server error"))
        
    }
}


export const deleteUser = async (req, res, next)=>{
    try {
        
       const {id} = req.params

      const users =  await User.findByIdAndDelete(id)
      

 res.status(200).json({
    success: true,
    message: "user  deleted",
    users
 })
      

    } catch (error) {
        next(handleError(500, "Internal server error"))
        
    }
}
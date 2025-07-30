import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res, next)=>{
    try {
        const {name, email, password}=req.body;
         
        if(!name || !email || !password){
            return res.status(400).json({message: 'Please fill all fields'});
        }
        
        //check if user already exists
       const existinguser= await User.findOne({email})
       if(existinguser){
            //if user already exists then return error
            next(handleError(400, 'User already exists'));

        }

        const hashpassword = await bcrypt.hash(password, 10);
        //create new user
       const user = await User.create({
            name,
            email,
            password: hashpassword,

          })

         if(!user){
            return next(handleError(500, 'User registration failed please try again'));
          }

        //user created successfully
        res.status(200)
        .json({
            success: true,
            message: 'User registered successfully',

        })

    } catch (error) {
        next(handleError(500, error.message || 'Internal Server Error'));
        
    }

}

export const Login = async (req, res, next)=>{
  try {
    const {email, password} = req.body;
      if(!email || !password){
          return res.status(400).json({message: 'Please fill all fields'});
      }
      //check if user exists
      const user = await User.findOne({email});
      if(!user){
          return res.status(400).json({message: 'Invalid login credentials'});
      }
      //check if password is correct

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if(!isPasswordValid){
          return res
          .status(400)
          .json({message: 'Invalid login credentials'});
      }
      //if password is correct then return user data
  
  const token = jwt.sign({
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  }, process.env.JWT_SECRET, { expiresIn: '1h' });
   

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "strict", // Adjust sameSite attribute based on environment
    path: "/"
  })
//for we can send the password in ft
const newUser = user.toObject({getters: true});
delete newUser.password; // Remove password from user object

      //login successful
  res.status(200)
      .json({
          success: true,
          newUser,
          message: 'Login successful',
         
      });
  } catch (error) {
    next(handleError(500, error.message));
    
  }


}

export const GoogleLogin = async (req, res, next)=>{
  try {
    const {name, email, avatar} = req.body;
      if(!email){
          return res.status(400).json({message: 'Please fill all fields'});
      }
      //check if user exists
      const user = await User.findOne({email});
      if(!user){
        const password = Math.random().toString()//generate a password
        //hash the password
        const hashpassword = bcrypt.hashSync(password, 10);
         //create new user if not exists
        const newUser = await User.create({
            name,
            email,
            password: hashpassword,
            avatar
          })

          await newUser.save(); // Save the new user to the database

      }
      
      //if password is correct then return user data
  
  const token = jwt.sign({
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  }, process.env.JWT_SECRET, { expiresIn: '1h' });
   

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "strict", // Adjust sameSite attribute based on environment
    path: "/"
  })
//for we can send the password in ft
const newUser = user.toObject();
delete newUser.password; // Remove password from user object

      //login successful
  res.status(200)
      .json({
          success: true,
         user: newUser,
          message: 'Login successful',
         
      });
  } catch (error) {
    next(handleError(500, error.message));
    
  }


}

export const Logout = async(req, res, next )=>{
 try {
   res.clearCookie("access_token", {
     httpOnly: true,
     secure: process.env.NODE_ENV === 'production',
     sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
     path: "/"
 
     });
   res.status(200)
   .json({
     success: true,
      message: 'Logged out successfully'});
       
 } catch (error) {
    next(handleError(500, error.message));
 }

}
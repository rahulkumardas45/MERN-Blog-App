import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import AuthRoute from './routes/Auth.route.js';
import UserRoute from './routes/User.route.js';
import CategoryRoute from './routes/Category.route.js';
import BlogRoute from './routes/Blog.route.js';
import CommentRoute from './routes/Comment.route.js';
import BlogLikeRoute from './routes/Bloglike.route.js';


dotenv.config();// IF I NOT SET UP DOTENV THEN  WE WILL NOT BE ABLE TO ACCESS ENVIRONMENT VARIABLES

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.use(cors(
  {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  }
));

//routes setup
app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/blog", BlogRoute);
app.use("/api/comment", CommentRoute);
app.use("/api/blog-like", BlogLikeRoute);




//conect database
mongoose.connect(process.env.MONGODB_CONN, {dbName: 'YT-MERN-BLOG'})
.then(()=>{
  console.log('Database connected successfully');
})
.catch(()=>{
  console.log('Database connection failed');
})




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

//all handle for the error middleware
app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
     statusCode,
      message,

  });


})

export default app;
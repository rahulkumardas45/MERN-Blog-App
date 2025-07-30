import express, { Router } from 'express';
import { addComment, commentCount, deleteComment, getAllComments, getComments } from '../controllers/Comment.controller.js';
import { authenticate } from '../middleware/authenticate.js';




const CommentRoute = express.Router();

CommentRoute.post('/add', authenticate, addComment)
CommentRoute.get('/get/:blogid', getComments)
CommentRoute.get('/get-count/:blogid', commentCount)
CommentRoute.get('/get-all-comment',  getAllComments)
CommentRoute.delete('/delete/:commentid', authenticate,deleteComment)





export default CommentRoute;
// app\controllers\commentRoutes.js

import { Router } from 'express';
import { ensureAuthenticated } from '../../utils/helperFunctions.js';
import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js'; 

const router = Router();

// Function to create a comment
const createComment = async (req, res) => {
    try {
      const { postId } = req.params;
      const { text } = req.body;
  
      const user = req.session.user;
  
      const post = await Post.findById(postId);
      if (!post) return res.status(404).send('Post not found');
  
      const comment = new Comment({ text, user: user._id });
      await comment.save();
  
      post.comments.push(comment);
      await post.save();
  
      res.redirect(`/post/${postId}`);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  // Function to delete a comment
  const deleteComment = async (req, res) => {
    try {
      const { postId, commentId } = req.params;
  
      // Deleting comment from comments collection
      await Comment.findByIdAndDelete(commentId);
  
      // Deleting comment reference from post
      await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
  
      res.redirect(`/post/${postId}`);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  };

router.post('/post/:postId/comment', ensureAuthenticated, createComment);
router.delete('/post/:postId/comment/:commentId', ensureAuthenticated, deleteComment);

export default router;

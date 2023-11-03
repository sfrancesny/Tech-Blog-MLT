// app/controllers/postRoutes.js

import { Router } from 'express';
import { ensureAuthenticated } from '../../utils/helperFunctions.js';
import Post from '../models/postModel.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
      // 1. Fetch a list of posts from your database
      const posts = await Post.find().sort({ createdAt: -1 }).limit(10);
      
      // 2. Render a view, passing in the list of posts as a variable
      res.render('home', { posts });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });  
  
  router.get('/post/:id', async (req, res) => {
    try {
      // 1. Get the ID from the route parameters
      const postId = req.params.id;
  
      // 2. Fetch the specific post by ID from your database
      const post = await Post.findById(postId);
  
      // 3. Check if the post was found
      if (!post) {
        return res.status(404).send('Post not found');
      }
  
      // 4. Render a view, passing in the post as a variable
      res.render('post', { post });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get('/dashboard/newPost', ensureAuthenticated, (req, res) => {
    // Render the form to create a new post
    res.render('newPost');
  });
  
  router.post('/dashboard/newPost', ensureAuthenticated, async (req, res) => {
    try {
      // Create a new post in the database using the data from the form submission
      const newPost = new Post(req.body);
      await newPost.save();
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  router.get('/dashboard/edit-post/:id', ensureAuthenticated, async (req, res) => {
    try {
      // Fetch the post from the database and render the edit form
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).send('Post not found');
      }
      res.render('editPost', { post });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  router.put('/dashboard/edit-post/:id', ensureAuthenticated, async (req, res) => {
    try {
      // Update the post in the database using the data from the form submission
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!post) {
        return res.status(404).send('Post not found');
      }
      res.redirect(`/post/${req.params.id}`);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  router.delete('/dashboard/delete-post/:id', ensureAuthenticated, async (req, res) => {
    try {
      // Delete the post from the database
      await Post.findByIdAndDelete(req.params.id);
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  export default router;

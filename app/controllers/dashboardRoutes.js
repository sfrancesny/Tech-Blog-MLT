// app\controllers\dashboardRoutes.js

import express from 'express';
// import * as dashboardController from '../controllers/dashboardController.js';
import { ensureAuthenticated } from '../utils/helperFunctions.js';

const router = express.Router();

// GET request to render the dashboard page
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    try {
      const posts = await dashboardController.getUserPosts(req.user.id); // Fetch posts created by the logged-in user
      res.render('dashboard', { posts });
    } catch (error) {
      console.error('Error loading dashboard:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // GET request to render the page for creating a new post
  router.get('/dashboard/new', ensureAuthenticated, (req, res) => {
    res.render('newPost');
  });
  
  // POST request to create a new post
  router.post('/dashboard/new', ensureAuthenticated, async (req, res) => {
    try {
      await dashboardController.createPost(req.user.id, req.body);
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // GET request to render the page for editing an existing post
  router.get('/dashboard/edit/:id', ensureAuthenticated, async (req, res) => {
    try {
      const post = await dashboardController.getPostById(req.params.id);
      if (!post) {
        return res.status(404).send('Post not found');
      }
      res.render('editPost', { post });
    } catch (error) {
      console.error('Error loading edit post page:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // POST request to update an existing post
  router.post('/dashboard/edit/:id', ensureAuthenticated, async (req, res) => {
    try {
      await dashboardController.updatePost(req.params.id, req.body);
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // POST request to delete an existing post
  router.post('/dashboard/delete/:id', ensureAuthenticated, async (req, res) => {
    try {
      await dashboardController.deletePost(req.params.id);
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  export default router;

  
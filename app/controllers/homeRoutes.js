// app\controllers\homeRoutes.js

import express from 'express';
import { ensureAuthenticated } from '../../utils/helperFunctions.js';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

const router = express.Router();

// route to render the homepage
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username').exec();

    res.render('home', { 
      posts: posts.map(post => post.toObject()), 
      logged_in: req.session.isAuthenticated 
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: err });
  }
});

// use ensureAuthenticated middleware to prevent access to route
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id).populate('posts').exec();
    res.render('dashboard', {
      ...user.toObject(),
      logged_in: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: err });
  }
});


export default router;

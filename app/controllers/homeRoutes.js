import express from 'express';
import { Post, User, Comment } from '../models'; // import necessary models
import withAuth from '../utils/helperFunctions.js'; // import helper functions if necessary

const router = express.Router();

// route to render the homepage
router.get('/', async (req, res) => {
  try {
    // get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // pass serialized data and session flag into template
    res.render('home', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

export default router;

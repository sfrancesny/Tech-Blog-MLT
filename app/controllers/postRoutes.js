// app\controllers\postRoutes.js

import { Router } from 'express';
const router = Router();
// import { renderHome, renderPost, renderNewPost, createPost, renderEditPost, updatePost, deletePost } from './postController';
import { ensureAuthenticated } from '../utils/helperFunctions';

router.get('/', renderHome);
router.get('/post/:id', renderPost);
router.get('/dashboard/newPost', ensureAuthenticated, renderNewPost);
router.post('/dashboard/newPost', ensureAuthenticated, createPost);
router.get('/dashboard/edit-post/:id', ensureAuthenticated, renderEditPost);
router.put('/dashboard/edit-post/:id', ensureAuthenticated, updatePost);
router.delete('/dashboard/delete-post/:id', ensureAuthenticated, deletePost);

export default router;

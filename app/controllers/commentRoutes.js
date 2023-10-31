// app\controllers\commentRoutes.js

import { Router } from 'express';
const router = Router();
// import { createComment, deleteComment } from './commentController';
import { ensureAuthenticated } from '../utils/helperFunctions.js';

router.post('/post/:postId/comment', ensureAuthenticated, createComment);
router.delete('/post/:postId/comment/:commentId', ensureAuthenticated, deleteComment);

export default router;

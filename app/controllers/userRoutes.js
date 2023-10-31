// app\controllers\userRoutes.js

import { Router } from 'express';

// import { renderLogin, login, logout, renderSignup, signup, renderDashboard } from './userController';
import { ensureAuthenticated } from '../utils/helperFunctions.js';

const router = Router();

router.get('/login', renderLogin);
router.post('/login', login);
router.get('/logout', logout);
router.get('/signup', renderSignup);
router.post('/signup', signup);
router.get('/dashboard', ensureAuthenticated, renderDashboard);

export default router;

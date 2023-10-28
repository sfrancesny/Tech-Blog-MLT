import { Router } from 'express';
const router = Router();
import { renderLogin, login, logout, renderSignup, signup, renderDashboard } from './userController';
import { ensureAuthenticated } from '../utils/helperFunctions';

router.get('/login', renderLogin);
router.post('/login', login);
router.get('/logout', logout);
router.get('/signup', renderSignup);
router.post('/signup', signup);
router.get('/dashboard', ensureAuthenticated, renderDashboard);

export default router;

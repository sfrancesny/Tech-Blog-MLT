// app\controllers\userRoutes.js
// app\controllers\userRoutes.js
import { Router } from 'express';
import { loginUser, registerUser, logout } from '../../utils/auth.js';
import { ensureAuthenticated } from '../../utils/helperFunctions.js';

const router = Router();

router.post('/login', loginUser);
router.get('/logout', logout);
// router.get('/signup', renderSignup);
router.post('/signup', registerUser); 
router.get('/dashboard', ensureAuthenticated);

export default router;

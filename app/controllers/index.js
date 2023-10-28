// app\controllers\index.js

import { Router } from 'express';
const router = Router();

// imported routes
import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';
import commentRoutes from './commentRoutes.js';
import homeRoutes from './homeRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import resetPasswordRoutes from './resetPassword.js'; 

// setting up routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/home', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/reset-password', resetPasswordRoutes); 

// If no API routes are hit, send the React app
router.use((req, res) =>
  res.sendFile(path.join(__dirname, '../public/views/home.handlebars'))
);

export default router;


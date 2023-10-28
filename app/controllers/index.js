import { Router } from 'express';
const router = Router();

// imported routes
import userRoutes from './userRoutes';
import postRoutes from './postRoutes';
import commentRoutes from './commentRoutes';
import homeRoutes from './homeRoutes';
import dashboardRoutes from './dashboardRoutes';

// setting up routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/home', homeRoutes);
router.use('/dashboard', dashboardRoutes);

// If no API routes are hit, send the React app
router.use((req, res) =>
  res.sendFile(path.join(__dirname, '../public/views/home.handlebars'))
);

export default router;

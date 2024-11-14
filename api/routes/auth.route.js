import express from 'express';
import { google, signin, signup, signout } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyUser.js';
const router = express.Router();

//
router.get('/checkAuth', verifyToken, (req, res) => {
    res.status(200).json({ message: 'User is authenticated' });
  });

router.get('/dashboard',verifyToken,(req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to the dashboard' });
})
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout',signout)
router.post('/google', google);

export default router;
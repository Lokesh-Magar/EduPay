import express from 'express';
import { google, signin, signup, signout } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyUser.js';
const router = express.Router();

//
router.get('/checkAuth', verifyToken, (req, res) => {
    res.status(200).json({ message: 'User is authenticated' });
  });

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout',signout)
router.post('/google', google);

export default router;
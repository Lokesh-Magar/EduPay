import express from 'express';
import {studsignin,studsignup,studsignout} from '../controllers/student.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

//Check if student is authenticated
router.get('/checkAuth', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Student is authenticated' });
});

router.get('/portal',verifyToken,(req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to the Portal' });
})
router.post('/studsignup', studsignup); 
router.post('/studsignin', studsignin);
router.post('/studsignout',studsignout);

export default router;
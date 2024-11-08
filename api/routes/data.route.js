import express from 'express';
import { getData } from '../controllers/data.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();
//Attach Routes
router.get('/invdata', verifyToken,getData);
export default router;
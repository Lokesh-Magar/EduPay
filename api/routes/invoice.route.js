// POST route for creating an invoice
import express from 'express';
import { verifyToken } from '../middlewares/verifyUser.js';
import { getInvData } from '../controllers/invoice.controller.js';
import { createInvoice } from '../controllers/invoice.controller.js';
import { getStudInvData } from '../controllers/invoice.controller.js';
const router = express.Router();

// POST route for creating an invoice
router.post('/invoicecreate',verifyToken,createInvoice);
router.get('/fetchInvData',verifyToken,getInvData);
router.get('/fetchStudInvData',verifyToken,getStudInvData);
router.get('/getStudent',verifyToken,getStudInvData);


export default router;
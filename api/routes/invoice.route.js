// POST route for creating an invoice
import express from 'express';
import { verifyToken } from '../middlewares/verifyUser.js';
import { getInvData, updateInvoice } from '../controllers/invoice.controller.js';
import { createInvoice } from '../controllers/invoice.controller.js';
import { getStudInvData } from '../controllers/invoice.controller.js';
import { uploadCSV } from '../controllers/invoice.controller.js';
import multer from 'multer';


const router = express.Router();
const upload = multer({ dest: 'uploads/' });
// POST route for creating an invoice
router.post('/invoicecreate',verifyToken,createInvoice);
router.get('/fetchInvData',verifyToken,getInvData);
router.get('/fetchStudInvData',verifyToken,getStudInvData);
router.get('/getStudent',verifyToken,getStudInvData);
router.put('/invoice/update/:id',verifyToken,updateInvoice);
router.post('/invoice/uploadCSV',upload.single('file'),uploadCSV);



export default router;
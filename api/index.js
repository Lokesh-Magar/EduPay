import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import studentRoutes from './routes/student.route.js';
import commentRoutes from './routes/comment.route.js';
import notificationRoutes from './routes/notification.route.js';
import invoiceRoutes from './routes/invoice.route.js';

import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';


import { getEsewaPaymentHash,verifyEsewaPayment } from './controllers/esewa.controller.js';
import Payment from './models/payment.model.js';
import Item from './models/item.model.js';
import PurchasedItem from './models/purchased.ItemModel.js';
import Invoice from './models/invoice.model.js';
import cron from 'node-cron';
import { processOverdueInvoices } from './controllers/invoice.controller.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();
const corsOptions={
  origin:"http://localhost:3000",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials:true,
  allowedHeaders:['Content-Type','Authorization','Accept','x-csrf-token'],
}

app.use(cors(corsOptions));
app.use(cookieParser());

// Cron job to run every Sunday at midnight for fine addition to overdue
cron.schedule('0 0 * * 0', async () => {
  console.log("Running weekly fine system...");
  await processOverdueInvoices();
});

//Routes used
app.use(express.json())
app.use('/api/auth',authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
//Api Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/auth/signup',authRoutes);
app.use('/api/auth/signout',authRoutes);
app.use(bodyParser.json());

//Notification Api routes
app.use('/api/notifications',notificationRoutes);
app.use('/api/notifications/fetchStudNotifyData',notificationRoutes);
app.use('/api',notificationRoutes);

//Invoice Api routes
app.use('/api/invoice',invoiceRoutes);
app.use('/api/invoice/invoicecreate',invoiceRoutes);
app.use('/api/invoice/fetchInvData',invoiceRoutes);
app.use('/api/invoice/fetchStudInvData',invoiceRoutes);
app.use('/api/invoice/getStudent',invoiceRoutes);
// app.use('/api/invoice/update/:id',invoiceRoutes);
app.use('/api',invoiceRoutes);

//Student Api routes
app.use('/api/student',studentRoutes);

app.use('/api/student/fetchStudents',studentRoutes);

app.use('/api',studentRoutes);
app.use('/api/student/studsignup',studentRoutes);
app.use('/api/student/studsignin',studentRoutes);
app.use('/api/student/studsignout',studentRoutes);
app.use('/api/student/getStudent',studentRoutes);
// app.use('/api/students', studentRoutes);

// Proxy endpoint to forward requests from frontend to Flask
app.post('/predict', async (req, res) => {
  try {
    
    const inputData = req.body;
    // Forward the data to the Flask server
    const flaskResponse = await axios.post('http://127.0.0.1:8080/predict', inputData);

    res.status(200).json(flaskResponse.data);
  } catch (error) {
    console.error('Error communicating with Flask server:', error.message);
    res.status(500).json({ error: 'Failed to communicate with the Flask server.' });
  }
});

//Success Route
app.get('/api/portal/success/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found.' });
    }
    invoice.status = 'Success';
    invoice.pendingAmount = 0;
    await invoice.save();
    res.status(200).json({ success: true, message: `Invoice ${id} marked as Success.You can close this window now.` });
    
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Failure route
app.get('/api/portal/failure/:id', async (req, res) => {
  try {
    const { id } = req.params; // This extracts the invoice ID from the route parameter

    
    const invoice = await Invoice.findById(id);

    if (!invoice) {
     
      return res.status(404).json({
        success: false,
        message: `Invoice with ID ${id} not found.`,
      });
    }

    // Update the status of the invoice to 'Failure'
    invoice.status = 'Failure';
    await invoice.save(); 

    // Respond with a success message of Failure page.
    return res.status(200).json({
      success: true,
      message: `Invoice ${id} marked as Failure.`,
      invoice,
    });
  } catch (error) {
    console.error('Error processing failure route:', error);

    // Respond with a 500 error in case of any server-side issues
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: error.message,
    });
  }
});


// This update route is used to update the status of an invoice not for the admin.
app.post('/update-invoice', async (req, res) => {
  try {
    const { _id, status } = req.query; // Extracts the query parameters

    // Validate input
    if (!_id || !status) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters: _id or status.',
      });
    }

    // Find the invoice by ID
    const invoice = await Invoice.findById(_id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: `Invoice with ID ${_id} not found.`,
      });
    }

    // Update the invoice status
    invoice.status = status;
   
    await invoice.save();

    // Send a success response
    return res.status(200).json({
      success: true,
      message: `Invoice with ID ${_id} successfully updated to status: ${status}.`,
      invoice,
    });
  } catch (error) {
    console.error('Error updating invoice:', error);

    // Handle any server-side errors
    return res.status(500).json({
      success: false,
      message: 'Internal server error while updating invoice.',
      error: error.message,
    });
  }
});


//------------------------------------------------------------
//Get student or user info

app.get('/api/userinfo',(req,res)=>{

  const token= req.cookies.access_token;
  if(!token){
    console.log("No token provided");
    return res.status(401).json({message: "No token provided"});
  }

   // Verify and decode the JWT token
   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Extract the necessary user information from the decoded token
    const { username, email } = decoded;
    res.status(200).json({ username, email });
  });

});

// Payment API Routes 
app.post("/initialize-esewa", async (req, res) => {
  try {
    const { itemId, totalPrice } = req.body;

    const itemData = await Item.findOne({
      _id: itemId,
      price: Number(totalPrice),
    });

    if (!itemData) {
      return res.status(400).send({
        success: false,
        message: "item not found",
      });
    }
    const purchasedItemData = await PurchasedItem.create({
      item: itemId,
      paymentMethod: "esewa",
      totalPrice: totalPrice,
    });
    const paymentInitate = await getEsewaPaymentHash({
      amount: totalPrice,
      transaction_uuid: purchasedItemData._id,
    });

    res.json({
      success: true,
      payment: paymentInitate,
      purchasedItemData,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

// to verify payment this is our `success_url`
app.get("/complete-payment", async (req, res) => {
  const { data } = req.query;

  try {
    const paymentInfo = await verifyEsewaPayment(data);
    const purchasedItemData = await PurchasedItem.findById(
      paymentInfo.response.transaction_uuid
    );
    if (!purchasedItemData) {
      res.status(500).json({
        success: false,
        message: "Purchase not found",
      });
    }
    // Create a new payment record
    const paymentData = await Payment.create({
      pidx: paymentInfo.decodedData.transaction_code,
      transactionId: paymentInfo.decodedData.transaction_code,
      productId: paymentInfo.response.transaction_uuid,
      amount: purchasedItemData.totalPrice,
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
      paymentGateway: "esewa",
      status: "success",
    }); 

    //updating purchased record
    await PurchasedItem.findByIdAndUpdate(
      paymentInfo.response.transaction_uuid,
      {
        $set: {
          status: "completed",
        },
      }
    );
    // Send success response
    res.json({
      success: true,
      message: "Payment Successful",
      paymentData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error,
    });
  }
});

app.get("/create-item", async (req, res) => {
  let itemData = await Item.create({
    name: "Headphone",
    price: 500,
    inStock: true,
    category: "vayo pardaina",
  });
  res.json({
    success: true,
    item: itemData,
  });
});

app.get("/test", function (req, res) {
  res.sendFile(__dirname + "/test.html");
});

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

app.listen(5000, () => {
  console.log('Server is running on port 5000!');
});
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
import dataRoutes from './routes/data.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

import { getEsewaPaymentHash,verifyEsewaPayment } from './controllers/esewa.controller.js';
import Payment from './models/payment.model.js';
import Item from './models/item.model.js';
import PurchasedItem from './models/purchased.ItemModel.js';

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
  // method:"GET,HEAD,PUT,PATCH,POST,DELETE",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials:true,
  allowedHeaders:['Content-Type','Authorization'],
}

app.use(cors(corsOptions));
app.use(cookieParser());
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
app.use('/api/notifications',notificationRoutes);

//Invoice Api routes
app.use('/api/invoice',invoiceRoutes);
app.use('/api/invoice/invoicecreate',invoiceRoutes);

//Fetch Data Api Routes
app.use('/api/invdata',dataRoutes);

//Student Api routes
app.use('/api/student',studentRoutes);
app.use('/api/student/studsignup',studentRoutes);
app.use('/api/student/studsignin',studentRoutes);
app.use('/api/student/studsignout',studentRoutes);

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
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import studentRoutes from './routes/student.route.js';
import commentRoutes from './routes/comment.route.js';
import notificationRoutes from './routes/notification.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';


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
  method:"GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials:true,
  allowedHeaders:['Content-Type','Authorization'],
}

app.use(cors(corsOptions));
app.use(cookieParser());
//Routes
app.use(express.json())
app.use('/api/auth',authRoutes);
//Routes
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/auth/signup',authRoutes);
app.use('/api/auth/signout',authRoutes);
app.use('/api/notifications',notificationRoutes)

//Student Api routes

app.use('/api/student', studentRoutes);
app.use('/api/student/studsignup',studentRoutes);
app.use('/api/student/studsignin',studentRoutes);
app.use('/api/student/studsignout',studentRoutes);

// app.use(express.static(path.join(__dirname, '/client/dist')));


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });
app.listen(5000, () => {
  console.log('Server is running on port 5000!');
});
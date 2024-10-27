// const mongoose = require('mongoose');
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// module.exports = mongoose.model('Notification', notificationSchema);
export default mongoose.model('Notification',notificationSchema);

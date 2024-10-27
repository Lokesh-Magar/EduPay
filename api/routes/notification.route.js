// /routes/notifications.js
import express from 'express';
import Notification from '../models/notification.model.js';  
const router = express.Router();

// GET: Fetch all notifications sorted by creation date (newest first)
router.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });  // Sort by date(newest first)
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;

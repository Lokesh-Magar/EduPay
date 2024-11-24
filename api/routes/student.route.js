import express from 'express';
import {studsignin,studsignup,studsignout,getStudents,updateStudent,deleteStudent} from '../controllers/student.controller.js';
import { verifyToken } from '../middlewares/verifyUser.js';
import mongoose from 'mongoose';
import Student from '../models/student.model.js';
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
router.get('/fetchStudents',getStudents);
// Route for updating a student
router.put('/update/:id', updateStudent);

// Route for deleting a student
router.delete('/delete/:id', deleteStudent);


export default router;
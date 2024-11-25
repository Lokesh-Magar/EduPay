import Student from '../models/student.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../middlewares/error.js';
import jwt from 'jsonwebtoken';

import Notification from '../models/notification.model.js';

export const studsignup=async (req, res, next)=>{

const {fullname,email,address,phone,studylevel,gender,password}=req.body;
if(
    !fullname||
    !email||
    !address||
    !phone||
    !studylevel||
    !gender||
    !password||
    fullname===''||
    email===''||
    address===''||
    phone===0||
    studylevel===''||
    gender===''||
    password===''
){
    next(errorHandler(400, 'All fields are required'));
}

const hashedPassword=bcryptjs.hashSync(password,10);

const newStudent = new Student({
    fullname,
    email,
    address,
    phone,
    studylevel,
    gender,
    password: hashedPassword,
});

try {
    newStudent.save();
    // It is used to send a JSON response to the client
    res.json('Student Signup successful');


//     //Creating Notification for the new user
//     const notification = new Notification({
//         title: 'New Student Registered',
//         message: `A Student Account has been registered with this email ${newStudent.email} under the name ${newStudent.fullname}`,
//         userId: newStudent._id,
// }   
//     );
//     await notification.save();
}
catch (error) {
    next(error);
}
};

export const studsignin = async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password || email === '' || password === '') {
      next(errorHandler(400, 'All fields are required'));
    }
  
    try {
      const validUser = await Student.findOne({ email });
      
      if (!validUser) {
        return next(errorHandler(404, 'Student not found'));
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(400, 'Invalid password'));
      }

        const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin, fullname: validUser.fullname, email: validUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }  // Set token expiry for 1 hour
    );
  
      const { password: pass, ...rest } = validUser._doc;
      res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,  // Prevents JS from accessing the cookie
        secure: process.env.NODE_ENV === 'production',  // Use Secure flag in production
        sameSite: 'strict',  // Prevent cross-site cookie leakage
        maxAge: 3600000  // Set cookie expiry (1 hour)
      })

      .json(rest);
    } catch (error) {
      next(error);
    }
  };
  
  export const studsignout = async (req, res, next) => {
    try {
      
      res.clearCookie('access_token', {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict', // (lax, strict, or none)
      });
  
      res.status(200).json({ message: 'Signed out successfully' });
    } catch (error) {
      console.error('Signout Error:', error);
      res.status(500).json({ message: 'Server Error: Unable to sign out' });
    }
  };
  
  export const getStudent = (req, res) => {
    const token = req.cookies.token; // Get token from cookies
  
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.json({ email: decoded.email, fullname: decoded.fullname });
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  
  //Function for the sending list of students
  export const getStudents = async (req, res) => {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      console.error('Error retrieving students:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };



  
  //UNUSED......

  export const updateStudent = async (req, res) => {
    const studentId = req.params.id;
    const { username, email } = req.body;
  
    // Validate the studentId before using it
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }
  
    try {
      const student = await Student.findByIdAndUpdate(
        studentId,
        { username, email }, // Directly update the fields
        { new: true } // Return the updated student object
      );
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json(student); // Send the updated student as the response
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Delete a student
  export const deleteStudent = async (req, res) => {
    const studentId = req.params.id;
  
    // Validate the studentId before using it
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }
  
    try {
      const student = await Student.findByIdAndDelete(studentId);
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../middlewares/error.js';
import jwt from 'jsonwebtoken';
import Notification from '../models/notification.model.js';
export const signup = async (req, res, next) => {
  const { username, email,phone, password } = req.body;
  if (
    !username ||
    !email ||
    !phone ||
    !password ||
    username === '' ||
    email === '' ||
    phone=== 0||
    password === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    phone,
    password: hashedPassword,
  });

  try {
    newUser.save();
    // It is used to send a JSON response to the client
    res.json('Signup successful');

    //Creating Notification for the new user
    const newNotification = new Notification({
      message:`College Administrator Registered with ${newUser.email} under the name ${newUser.username}`,
    });
    newNotification.save();
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === '' || password === ''){
    next(errorHandler(400, 'All fields are required'));}
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin ,email:validUser.email},
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie('access_token', token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 //
      } ).json({ message: 'Login successful', user: { id: validUser._id, email: validUser.email, isAdmin: validUser.isAdmin } });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    
    res.clearCookie('access_token', {
      httpOnly: true, // Ensure that cookie cannot be accessed via client-side scripts
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', // (lax, strict, or none)
    });

    // You can add additional logic here, like invalidating the token if stored in a database

    res.status(200).json({ message: 'Signed out successfully' });
  } catch (error) {
    console.error('Signout Error:', error);
    res.status(500).json({ message: 'Server Error: Unable to sign out' });
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};


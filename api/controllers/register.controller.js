import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import Register from '../models/register.model.js';

export const registerTest= ()=>{
    res.json({message:"Registration service online."})
}
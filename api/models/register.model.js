import mongoose from "mongoose";

const registerSchema = new mongoose.Schema(

    {

        username:{
            type:String,
            required:true,
            unique:true


        },
        email:{
            type:String,
            required:true,
            unique:true,

        },
        phone:{
            type:Number,
            required:true,
        },
        password:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            default:false
        }

    }

   

)
const Register=mongoose.model('Register',registerSchema)
export default Register;
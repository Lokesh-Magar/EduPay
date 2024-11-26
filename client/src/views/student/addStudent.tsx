"use client";

import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  TextField,
  InputAdornment,

  CircularProgress,
  MenuItem,
  Menu,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import KeySharpIcon from "@mui/icons-material/KeySharp";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import SentimentSatisfiedAltSharpIcon from "@mui/icons-material/SentimentSatisfiedAltSharp";
import ContactPhoneSharpIcon from "@mui/icons-material/ContactPhoneSharp";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import WcIcon from '@mui/icons-material/Wc';
import MenuBookIcon from '@mui/icons-material/MenuBook';


interface RegisterProps {
  title?: string;
  open?: boolean;
  handleClose?: () => void;
  openLoginDialog?: () => void; // New prop to open Login dialog
}
const AddStudent: React.FC<RegisterProps> = ({
  title = "Add Student",
  
}) => {
  const [showPassword, setShowPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    const { register, handleSubmit, reset,formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState<string | null>(null);
  
    const handleTogglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
    };

const router = useRouter();
const onSubmit = async (data:any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    console.log(data);

    try {
        const response = await axios.post('/student/studsignup', data);
        console.log(response.data);
        setSuccess(response.data.message);
        toast.success("Student Added Successfully.");
        reset();
        
    } catch (err:any) {
        if (err.response) {
            setError(err.response.data.message || 'An error occurred');
        } else {
            setError('An error occurred');
        }
    } finally {
        setLoading(false);
        router.push('/dashboard');
    }
};
  return (
    <>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          position="relative"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
          >
          
            <Typography
              variant="h6"
              style={{ fontSize: "25px" }}
            >
              {title}
            </Typography>
          </Box>
        
        </Box>
      
      
        <Box mt="20px" style={{ display: "flex"}}>
        <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <Box
              component="form"
              sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
              noValidate
              autoComplete="off"
            >
            
            
            <div className="fullnameEmail" style={{display:"flex",gap:"5%"}}>
            <TextField
             margin="normal"
             fullWidth
             id="fullname"
             label="Full Name"
             className="fullname"
             required
             
             autoFocus
             {...register('fullname', { required: 'Full Name is required' })}
             error={!!errors.fullname}
             helperText={errors.fullname?.message}
            
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                className="email"
                required
                autoComplete="email"
                autoFocus
                {...register('email', { required: 'Email is required' })}
                error={!!errors.email}
                helperText={errors.email?.message}
                
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailSharpIcon />
                      </InputAdornment>
                    ),
                  }}
                />
            </div>
          

              <div className="phoneAddress" style={{display:"flex",gap:"5%"}}>
              <TextField
             margin="normal"
             id="address"
             label="Address"
             style={{ width: "50%" }}
             className="address"
             required
            //  autoComplete="username"
             autoFocus
             {...register('address', { required: 'Address is required' })}
             error={!!errors.address}
             helperText={errors.address?.message}
            
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon />
                    </InputAdornment>
                  ),
                }}
              />


              <TextField
                variant="outlined"
                id="phone"
                className="phone"
                label="Phone Number"
                placeholder="Enter your number"
                autoComplete="phone"
                style={{ width: "50%" ,marginTop:'15px'}}
                required
                autoFocus
                {...register('phone',{required:'Phone number is required.'})}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                
                // onChange={/*(e) => {
                //   const value = e.target.value.replace(/[^0-9]/g, ""); // It will allow only numbers
                //   setFormData(value);
                // }*/onChanged}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactPhoneSharpIcon /> {/* Phone icon */}
                      <span style={{ marginLeft: "8px" }}>+977</span>
                      {/* Country code with space */}
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src="/nepal.png" // Local image path to the Nepal flag
                        alt="Nepal Flag"
                        style={{ width: "20px", margin: "0 4px" }} // Adjust size and margins
                      />
                    </InputAdornment>
                  ),
                  inputProps: {
                    maxLength: 10, //   10-digit phone number
                  },
                }}
              />
              </div>
              
             
                <div className="studyGender" style={{display:"flex",gap:"5%"}}>

                <TextField
              margin="normal"
              fullWidth
              id="studylevel"
              label="Study Level"
              className="studylevel"
              required
              autoComplete="studylevel"
              autoFocus
              defaultValue="select"
              select
              {...register('studylevel', { required: 'Study Level is required' })}
              error={!!errors.studylevel}
              helperText={errors.studylevel?.message}
              
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MenuBookIcon />
                    </InputAdornment>
                  ),
                }}
              >
                
                <MenuItem value="select">Select Class</MenuItem>
                <MenuItem value="pg">PG</MenuItem>
                <MenuItem value="nursery">Nursery</MenuItem>
                <MenuItem value="kg">KG</MenuItem>
                <MenuItem value="one">One</MenuItem>
                <MenuItem value="two">Two</MenuItem>
                <MenuItem value="three">Three</MenuItem>
                <MenuItem value="four">Four</MenuItem>
                <MenuItem value="five">Five</MenuItem>
                <MenuItem value="six">Six</MenuItem>
                <MenuItem value="seven">Seven</MenuItem>
                <MenuItem value="eight">Eight</MenuItem>
                <MenuItem value="nine">Nine</MenuItem>
                <MenuItem value="ten">Ten</MenuItem>


              </TextField>
              <TextField
              margin="normal"
              fullWidth
              id="gender"
              label="Gender"
              className="gender"
              required
              autoComplete="gender"
              autoFocus
              defaultValue="select"
              select
              {...register('gender', { required: 'Gender is required' })}
              error={!!errors.gender}
              helperText={errors.gender?.message}
              
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WcIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="select">Select Gender</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="others">Others</MenuItem>

              </TextField>

                </div>
              
                
              <div className="password" style={{display:"flex",marginTop:'20px'}}>
              <TextField
                type={showPassword ? "text" : "password"}
                label="Password"
                id="password"
                className="password"
                autoComplete="password"
                autoFocus
                style={{ width: "47.5%" }}
                required
                {...register('password',{required:'Password is required.'})}
                error={!!errors.password}
                helperText={errors.password?.message}
                
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeySharpIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
             />
              </div>
            </Box>
            {/* Remove Divider /}
            {/ <Divider sx={{ my: 2 }} /> */}
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="success">{success}</Typography>}
              <Button
                color="primary"
                variant="contained"
               sx={{width:'15%',marginLeft:'10px'}}
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Submit {loading ? <CircularProgress size={24} /> : ''}
              </Button>
              <ToastContainer autoClose={false} /> 
          </Stack>
        </Box>
      
    </>)
    }

export default AddStudent;
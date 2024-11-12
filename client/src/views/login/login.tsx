// src/views/login/login.tsx

//THIS IS STUDENT LOGIN PAGE FOR STUDENT PORTAL
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import KeySharpIcon from "@mui/icons-material/KeySharp";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import Image from "next/image";
// import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode, { jwtDecode } from "jwt-decode";
import { UserProvider, useUser } from "@/UserContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface LoginProps {
  title?: string;
  subtext?: JSX.Element | JSX.Element[];
  open: boolean;
  handleClose: () => void;
  openRegisterDialog?: () => void; // New prop for opening the Register dialog
}

const Login: React.FC<LoginProps> = ({
  title,
  subtext,
  open,
  handleClose,
  openRegisterDialog,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState<string | null>(null);
   
 

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  
  const {setUser}=useUser();

  const onSubmit = async (data:any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    
    try {
        const response = await axios.post('/student/studsignin',data,{withCredentials:true});
        
        // const userResponse = await axios.get('/api/userinfo', { withCredentials: true });


        setUser(response.data);//Update the set user context
        toast.success("Login successful");
        // Set the success message
        // setSuccess(response.data.message);
        router.push('/portal');
   
 
    } catch (err:any) {
        if (err.response) {
            setError(err.response.data.message || 'An error occurred');
            toast.error("Check your credentials,=.");
        } else {
            setError("An error occurred");
            toast.error("Check your credentials,=.");
        }
    } finally {
        setLoading(false);
    }
};
  return (
   
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        style: { width: "25%", height: "70%", position: "relative" },
      }}
    >
      <DialogTitle>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={2}
          position="relative"
        >
          <Image src="/edupay.png" alt="EduFee Logo" width={140} height={140} />
          <Typography
            variant="h6"
            mt={2}
            style={{ marginLeft: "-50.5%", fontSize: "23px" }}
          >
            {title || "Student Login"}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        {subtext && <Box mb={2}>{subtext}</Box>}
        
        <Stack spacing={2}>
          <Box mt="20px">
            <Box
              component="form"
              sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
              noValidate
              autoComplete="off"
            >
               <TextField
              type="email"
              id="email"
              label="Email"
              className="email"
              autoComplete="email"
              required
              autoFocus
              {...register('email', { required: 'Email is required' })}
              // error={!!errors.email}
              // helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailSharpIcon />
                  </InputAdornment>
                ),
              }}
            />
              <TextField
              type={showPassword ? "text" : "password"} // Updated to show/hide password
              id="password"
              label="Password"
                className="password"
                autoComplete="password"
                autoFocus
                required
                {...register('password',{required:'Password is required.'})}
              
                // error={!!errors.password}
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
                      edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            </Box>
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Remember this Device"
              />
            </FormGroup>
            <Typography
              component="a"
              href="/"
              fontWeight="500"
              sx={{ textDecoration: "none", color: "primary.main" }}
            >
              Forgot Password?
            </Typography>
          </Stack>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">{success}</Typography>}
          <Stack spacing={2}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Sign In {loading ? <CircularProgress size={24} /> : ''}
            </Button>
            <Box textAlign="center">
              <Typography variant="body2">
                New to EduFee?{" "}
                <Typography
                  component="a"
                  color="primary"
                  fontWeight="500"
                  onClick={openRegisterDialog} // Open Register dialog
                  style={{ cursor: "pointer" }}>
                  Sign Up
                </Typography>
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
          </Dialog>
  );
};

export default Login;
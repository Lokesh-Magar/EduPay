"use client";
import { Grid, Box, Card, Typography, Stack, Button, InputAdornment, IconButton, TextField, Container, CircularProgress } from "@mui/material";

import { useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";

import KeySharpIcon from "@mui/icons-material/KeySharp";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import SentimentSatisfiedAltSharpIcon from "@mui/icons-material/SentimentSatisfiedAltSharp";
import ContactPhoneSharpIcon from "@mui/icons-material/ContactPhoneSharp";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { Router } from "express";
import { useRouter } from "next/navigation";
import styles from '../../app/Form.module.css'
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import Image from "next/image";

const IRegister:React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState<string | null>(null);
  
    const handleTogglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
    };

    const handleClose = () => {
      window.location.href = "/";
    };

    const router = useRouter()

const onSubmit = async (data:any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    console.log(data);
    
    try {
        const response = await axios.post('/auth/signup', data);
        console.log(response.data);
        setSuccess(response.data.message);
        router.push('/')
        
    } catch (err:any) {
        if (err.response) {
            setError(err.response.data.message || 'An error occurred');
        } else {
            setError(err.response.data.message('An error occurred'));
        }
    } finally {
        setLoading(false);
    }
};


return(
  
    <Box
      sx={{
        position: "relative",
        "&:before": {
          content: '""',
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: "0.3",
        },
      }}
    >
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card className={styles.cards}
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px", boxShadow:'none' }}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
             
            <Image
                src="/edupay.png"
                alt="EduFee Logo"
                width={140}
                height={140}
                style={{ marginTop: "-7%" }}
              />
              
            </Box>

            <Button onClick={handleClose} className={styles.cross}>
              <CloseSharpIcon />
            </Button>
            <h2
              style={{
                marginBottom: "5%",
                marginLeft: "3%",
                fontSize: "1.5em",
                fontWeight: "bold",
              }}
            >
              Register
            </h2>
        
      <Box>
        <Stack mb={3}>
          <Box >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "30ch" },
              }}
              noValidate
            //   autoComplete="off"
              // onSubmit={handleSubmit(onSubmit)}

            >
              <TextField
             margin="normal"
             fullWidth
             id="username"
             label="Username"
             className="username"
             
             autoComplete="username"
             autoFocus
             {...register('username', { required: 'Username is required' })}
             error={!!errors.username}
            //  helperText={errors.username?.message}
            
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SentimentSatisfiedAltSharpIcon />
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
              autoComplete="email"
              autoFocus
              {...register('email', { required: 'Email is required' })}
              error={!!errors.username}
              // helperText={errors.email?.message}
              
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailSharpIcon />
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
                // helperText={errors.phone?.message}
                autoFocus
                {...register('phone',{required:'Phone number is required.'})}
                
                
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

              <TextField
                type={showPassword ? "text" : "password"}
                label="Password"
                id="password"
                className="password"
                autoComplete="password"
                autoFocus
                {...register('password',{required:'Password is required.'})}
                
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
                // helperText={errors.password?.message}
             />
            </Box>
          </Box>
        </Stack>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}
        <Button
          color="primary"
          variant="contained"
          size="large"
          type='submit'
          onClick={handleSubmit(onSubmit)}
          fullWidth >
          Sign Up {loading ? <CircularProgress size={24} /> : ''}
        </Button>
        <Box textAlign="center">
                <Typography variant="body2"
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginTop="5%">
                  Already have an account?{" "}
                  <Typography
                    component="a"
                    href="/login"
                    color="primary"
                    fontWeight="500"
                    
                  >
                    Sign In
                  </Typography>
                </Typography>
              </Box>
        
      </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
    
)
};

export default IRegister;
"use client";
import { Grid, Box, Card, Typography, Stack, Button, InputAdornment, IconButton, TextField, Container, CircularProgress } from "@mui/material";
import Link from "next/link";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import { useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { title } from "process";
import KeySharpIcon from "@mui/icons-material/KeySharp";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import SentimentSatisfiedAltSharpIcon from "@mui/icons-material/SentimentSatisfiedAltSharp";
import ContactPhoneSharpIcon from "@mui/icons-material/ContactPhoneSharp";
import axios from "axios";
import { useForm } from 'react-hook-form';

const IRegister:React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
  
    const handleTogglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
    };

//     const [formData, setFormData] = useState({
//       username: '',
//       email: '',
//       phone:0,
//       password: ''
//   });

//   const {username,email,phone,password}= formData;

//   const onChanged = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
// };

//   const onSubmitted = async (e) => {
//     e.preventDefault();
//     try {
//         const res = await axios.post('/api/auth/signup', formData);
//         console.log(res.data);
//     } catch (err) {
//         if (err.response) {
//             // Server responded with a status code outside of the 2xx range
//             console.error('Response data:', err.response.data);
//             console.error('Response status:', err.response.status);
//             console.error('Response headers:', err.response.headers);
//         } else if (err.request) {
//             // Request was made but no response was received
//             console.error('Request data:', err.request);
//         } else {
//             // Something went wrong setting up the request
//             console.error('Error message:', err.message);
//         }
//         console.error('Error config:', err.config);
//     }
// };

const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    console.log(data);
    
    try {
        const response = await axios.post('http://localhost:3000/api/auth/signup', data);
        console.log(response.data);
        setSuccess(response.data.message);
    } catch (err) {
        if (err.response) {
            setError(err.response.data.message || 'An error occurred');
        } else {
            setError('An error occurred');
        }
    } finally {
        setLoading(false);
    }
};


return(
  <Container component="main">
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
          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
             
            <Logo />
              
            </Box>
        
      <Box>
        <Stack mb={3}>
          <Box mt="45px">
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
             helperText={errors.username?.message}
            
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
              <TextField
                variant="outlined"
                id="phone"
                className="phone"
                label="Phone Number"
                placeholder="Enter your number"
                autoComplete="phone"
                helperText={errors.phone?.message}
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
                helperText={errors.password?.message}
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
          Sign Up 
        </Button>
        {loading ? <CircularProgress size={24} /> : ''}
      </Box>
          </Card>
        </Grid>
      </Grid>
    </Box></Container>
    // <form onSubmit={onSubmit}>
    //         <input
    //             type="text"
    //             name="username"
    //             value={username}
    //             onChange={onChanged}
    //             placeholder="Name"
    //         />
    //         <input
    //             type="email"
    //             name="email"
    //             value={email}
    //             onChange={onChanged}
    //             placeholder="Email"
    //         />
    //         <input 
    //             type="number"
    //             name="phone"
    //             value={phone}
    //             onChange={onChanged}
    //             placeholder="Phone Number"

    //         />
    //         <input
    //             type="password"
    //             name="password"
    //             value={password}
    //             onChange={onChanged}
    //             placeholder="Password"
    //         />
    //         <button type="submit">Register</button>
    //     </form>
  
)
};

export default IRegister;
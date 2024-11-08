"use client";
import Link from "next/link";
import { useState } from "react";
import { Grid, Box, Card, Stack, Typography, TextField, InputAdornment, FormGroup, FormControlLabel, Checkbox, CircularProgress, Container } from "@mui/material";


import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import KeySharpIcon from "@mui/icons-material/KeySharp";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from '../../app/Form.module.css';
import Image from "next/image";

const ILogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()

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

    const onSubmit = async (data:any) => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
          const response = await axios.post('/auth/signin', data);
            setSuccess(response.data.message);
          router.push('/dashboard')
   
      } catch (err:any) {
          if (err.response) {
              setError(err.response.data.message || 'An error occurred');
          } else {
              setError('An error occurred');
          }
      } finally {
          setLoading(false);
      }
  };
  return (
  
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
          elevation={9} className={styles.cards}
          sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
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
             Admin Login
            </h2>
          
     
      <Stack>
        <Box >
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              type="email"
              id="email"
              label="Email"
              className="email"
              autoComplete="email"
              autoFocus
              {...register('email', { required: 'Email is required' })}
              error={!!errors.username}
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
                className="password"
                autoComplete="password"
                autoFocus
                {...register('password',{required:'Password is required.'})}
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
              label="Remember this Device" // Fixed the typo here
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password?
          </Typography>
        </Stack>
      </Stack>

      <Box>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}
        <Button
             color="primary"
             variant="contained"
             size="large"
             type='submit'
             onClick={handleSubmit(onSubmit)}
             fullWidth
        >
         Sign In {loading ? <CircularProgress size={24} /> : ''}
        </Button>
      </Box>

              <Typography
                variant="subtitle1"
                textAlign="center"
                color="textSecondary"
                mb={1}
              ></Typography>
            
           
              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                mt={3}
              >
                <Typography
                  color="textSecondary"
                  variant="h6"
                  fontWeight="500"
                >
                  New to EduPay?
                </Typography>
                <Typography
                  component={Link}
                  href="/backregister"
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Create an account
                </Typography>
              </Stack>
            
          
        </Card>
      </Grid>
    </Grid>
    </Box>
    
  );
};
export default ILogin;


"use client";
import Link from "next/link";
import { useState } from "react";
import { Grid, Box, Card, Stack, Typography, TextField, InputAdornment, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
// components

import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";

import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import KeySharpIcon from "@mui/icons-material/KeySharp";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const ILogin = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
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
          elevation={9}
          sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <Logo />
          </Box>
          <>
     
      <Stack>
        <Box mt="45px">
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
              label="Email" // Fixed the typo here
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
              type={showPassword ? "text" : "password"} // Updated to show/hide password
              id="password" // Changed to unique id
              label="Password"
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
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          href="/" // Change to the correct route for form submission if needed
          type="submit"
        >
         Sign In
        </Button>
      </Box>

      
    </>
          
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
                  href="/register"
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


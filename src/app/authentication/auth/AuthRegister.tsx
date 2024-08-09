"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import Link from "next/link";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { Stack } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import SentimentSatisfiedAltSharpIcon from "@mui/icons-material/SentimentSatisfiedAltSharp";
import KeySharpIcon from "@mui/icons-material/KeySharp";
import ContactPhoneSharpIcon from "@mui/icons-material/ContactPhoneSharp"; // Import the phone icon

interface RegisterType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister: React.FC<RegisterType> = ({ title, subtitle, subtext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack mb={3}>
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
                type="text"
                id="username"
                label="Username"
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
                type="email"
                id="outlined-email"
                label="Email"
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
                placeholder="Enter your number"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ""); // It will allow only numbers
                  setPhoneNumber(value);
                }}
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
                id="outlined-password"
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
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          href="/authentication/login"
        >
          Sign Up
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;

"use client";
import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import KeySharpIcon from "@mui/icons-material/KeySharp";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import SentimentSatisfiedAltSharpIcon from "@mui/icons-material/SentimentSatisfiedAltSharp";
import ContactPhoneSharpIcon from "@mui/icons-material/ContactPhoneSharp";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon

interface RegisterProps {
  title?: string;
  open?: boolean;
  handleClose?: () => void;
  openLoginDialog?: () => void; // New prop to open Login dialog
}

const Register: React.FC<RegisterProps> = ({
  title = "Register",
  open = false,
  handleClose,
  openLoginDialog, // Add this prop
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        style: { maxWidth: "400px", width: "100%", position: "relative" },
      }}
    >
      <DialogTitle>
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
            <Image
              src="/edupay.png"
              alt="EduFee Logo"
              width={140}
              height={140}
              style={{ marginLeft: "75%" }}
            />
            <Typography
              variant="h6"
              style={{ fontSize: "25px", marginLeft: "3%" }}
            >
              {title}
            </Typography>
          </Box>
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
        <Box mt="20px">
          <Stack spacing={2}>
            <Box
              component="form"
              sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
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
                id="email"
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
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                  setPhoneNumber(value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactPhoneSharpIcon />
                      <span style={{ marginLeft: "8px" }}>+977</span>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src="/nepal.png"
                        alt="Nepal Flag"
                        style={{ width: "20px", margin: "0 4px" }}
                      />
                    </InputAdornment>
                  ),
                  inputProps: {
                    maxLength: 10, // 10-digit phone number
                  },
                }}
              />
              <TextField
                type={showPassword ? "text" : "password"}
                id="password"
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
            <Stack spacing={2}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
              >
                Sign Up
              </Button>
              <Box textAlign="center">
                <Typography variant="body2">
                  Already have an account?{" "}
                  <Typography
                    component="a"
                    href="#"
                    color="primary"
                    fontWeight="500"
                    onClick={() => {
                      handleClose?.();
                      openLoginDialog?.(); // Open Login dialog
                    }}
                  >
                    Sign In
                  </Typography>
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Register;

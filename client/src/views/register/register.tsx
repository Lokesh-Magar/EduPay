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
  CircularProgress,
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
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const router = useRouter();
  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    console.log(data);

    try {
      const response = await axios.post("/auth/signup", data);
      console.log(response.data);
      setSuccess(response.data.message);

      reset();

      openLoginDialog();
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "An error occurred");
      } else {
        setError("An error occurred");
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
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                required
                className="username"
                autoComplete="username"
                autoFocus
                {...register("username", { required: "Username is required" })}
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
                required
                className="email"
                autoComplete="email"
                autoFocus
                {...register("email", { required: "Email is required" })}
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
                required
                placeholder="Enter your number"
                autoComplete="phone"
                // helperText={errors.phone?.message}
                autoFocus
                {...register("phone", {
                  required: "Phone number is required.",
                })}
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
                required
                autoComplete="password"
                autoFocus
                {...register("password", { required: "Password is required." })}
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

            {/* Remove Divider /}
            {/ <Divider sx={{ my: 2 }} /> */}

            <Stack spacing={2}>
              {error && <Typography color="error">{error}</Typography>}
              {success && <Typography color="success">{success}</Typography>}
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Sign Up
              </Button>
              <Box textAlign="center">
                <Typography variant="body2">
                  Already have an account?{" "}
                  <Typography
                    component="a"
                    color="primary"
                    fontWeight="500"
                    onClick={() => {
                      handleClose?.();
                      openLoginDialog?.(); // Open Login dialog
                    }}
                    style={{ cursor: "pointer" }}
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

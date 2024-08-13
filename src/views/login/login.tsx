// src/views/login/login.tsx
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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import KeySharpIcon from "@mui/icons-material/KeySharp";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import Image from "next/image";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import CloseIcon from "@mui/icons-material/Close";

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

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        style: { width: "25%", height: "81%", position: "relative" },
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
            style={{ marginLeft: "-75.5%", fontSize: "25px" }}
          >
            {title || "Login"}
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

          <Stack spacing={2}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
            >
              Sign In
            </Button>
            <Box textAlign="center">
              <Typography variant="body2">
                New to EduFee?{" "}
                <Typography
                  component="a"
                  href="#"
                  color="primary"
                  fontWeight="500"
                  onClick={openRegisterDialog} // Open Register dialog
                >
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

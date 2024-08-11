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
  Divider,
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

interface LoginProps {
  title?: string;
  subtext?: JSX.Element | JSX.Element[];
  open?: boolean;
  handleClose?: () => void;
}

const Login: React.FC<LoginProps> = ({ title, subtext, open, handleClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Determine if the component should render as a Dialog or a standalone page
  const isDialog = open !== undefined && handleClose !== undefined;

  return isDialog ? (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{ style: { width: "25%", height: "81%" } }}
    >
      <DialogTitle>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Image src="/edupay.png" alt="EduFee Logo" width={140} height={140} />
          <Typography
            variant="h6"
            mt={2}
            style={{ marginLeft: "-75.5%", fontSize: "25px" }}
          >
            {title || "Login"}
          </Typography>
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

          <Divider sx={{ my: 2 }} />

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
                  href="/register"
                  color="primary"
                  fontWeight="500"
                >
                  Sign Up
                </Typography>
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      p={2}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          p: 4,
          boxShadow: 9,
          borderRadius: 1,
          bgcolor: "background.paper",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Logo />
        </Box>
        <Typography variant="h6" textAlign="center" mb={2}>
          {title || "Login"}
        </Typography>
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
          <Divider sx={{ my: 2 }} />
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
                  href="/signup"
                  color="primary"
                  fontWeight="500"
                >
                  Sign Up
                </Typography>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

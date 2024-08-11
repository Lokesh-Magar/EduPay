"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import React, { useState } from "react";
import {
  FormGroup,
  FormControlLabel,
  Button,
  Checkbox,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import KeySharpIcon from "@mui/icons-material/KeySharp";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import Image from "next/image";

interface LoginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
  open: boolean;
  handleClose: () => void;
}

const Login: React.FC<LoginType> = ({ title, subtext, open, handleClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <PageContainer title="Login" description="this is Login page">
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
              <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                PaperProps={{ style: { width: "25%", height: "81%" } }}
              >
                <DialogTitle>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mb={2}
                  >
                    <Image
                      src="/edupay.png"
                      alt="EduFee Logo"
                      width={140}
                      height={140}
                    />
                    <Typography
                      variant="h6"
                      mt={2}
                      style={{ marginLeft: "-80%", fontSize: "20px" }}
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
                        sx={{
                          "& > :not(style)": { m: 1, width: "100%" },
                        }}
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
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
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
                          <Link href="/signup" passHref>
                            <Typography
                              component="span"
                              color="primary"
                              fontWeight="500"
                            >
                              Sign Up
                            </Typography>
                          </Link>
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
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default Login;

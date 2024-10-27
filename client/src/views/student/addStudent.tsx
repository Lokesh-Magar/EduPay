"use client";

// React Imports
import { useState, SyntheticEvent, ChangeEvent, MouseEvent } from "react";

// MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import MenuItem from "@mui/material/MenuItem";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Components Imports
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import QRCODE from "../qrCode/qrCode";

// Define the FormDataType
type FormDataType = {
  firstName: string;
  lastName: string;
  country: string;
  language: string[];
  date: Date | null;
  phoneNumber: string;
  address1: string;
  address2: string;
  postal: string;
  username: string;
  studylevel: string;
  gender: string;
  email: string;
  password: string;
  isPasswordShown: boolean;
  confirmPassword: string;
  isConfirmPasswordShown: boolean;
  twitter: string;
  facebook: string;
  google: string;
  linkedin: string;
  instagram: string;
  quora: string;
};

const AddStudent = () => {
  // States
  const [value, setValue] = useState<string>("personal_info");

  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    country: "",
    language: [],
    date: null,
    phoneNumber: "",
    address1: "",
    address2: "",
    postal: "",
    username: "",
    studylevel: "",
    gender: "",
    email: "",
    password: "",
    isPasswordShown: false,
    confirmPassword: "",
    isConfirmPasswordShown: false,
    twitter: "",
    facebook: "",
    google: "",
    linkedin: "",
    instagram: "",
    quora: "",
  });

  // Toggle password visibility
  const handleClickShowPassword = () =>
    setFormData((prev) => ({
      ...prev,
      isPasswordShown: !prev.isPasswordShown,
    }));

  // Toggle confirm password visibility
  const handleClickShowConfirmPassword = () =>
    setFormData((prev) => ({
      ...prev,
      isConfirmPasswordShown: !prev.isConfirmPasswordShown,
    }));

  // Handle tab change
  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      country: "",
      language: [],
      date: null,
      phoneNumber: "",
      address1: "",
      address2: "",
      postal: "",
      username: "",
      studylevel: "",
      gender: "",
      email: "",
      password: "",
      isPasswordShown: false,
      confirmPassword: "",
      isConfirmPasswordShown: false,
      twitter: "",
      facebook: "",
      google: "",
      linkedin: "",
      instagram: "",
      quora: "",
    });
  };

  // Handle form submit
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted", formData);
  };

  // Handle input change for text fields
  const handleTextFieldChange =
    (field: keyof FormDataType) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  // Handle select change for multiple select
  const handleMultipleSelectChange =
    (field: keyof FormDataType) => (e: ChangeEvent<{ value: unknown }>) => {
      setFormData({ ...formData, [field]: e.target.value as string[] });
    };

  // Handle select change for single select
  const handleSelectChange =
    (field: keyof FormDataType) => (e: ChangeEvent<{ value: unknown }>) => {
      setFormData({ ...formData, [field]: e.target.value as string });
    };

  return (
    <Card sx={{ height: "120%", width: "100%" }}>
      <TabContext value={value}>
        <TabList
          variant="scrollable"
          onChange={handleTabChange}
          className="border-be"
        >
          <Tab label="Personal Info" value="personal_info" />
          <Tab label="Account Details" value="account_details" />
        </TabList>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <TabPanel value="personal_info">
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label="First Name"
                    placeholder="Mister"
                    value={formData.firstName}
                    onChange={handleTextFieldChange("firstName")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label="Last Name"
                    placeholder="Cat"
                    value={formData.lastName}
                    onChange={handleTextFieldChange("lastName")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Country"
                    value={formData.country}
                    onChange={handleSelectChange("country")}
                  >
                    <MenuItem value="">Select Country</MenuItem>
                    <MenuItem value="Nepal">Nepal</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Language"
                    value={formData.language}
                    SelectProps={{
                      multiple: true,
                      onChange: handleMultipleSelectChange("language"),
                    }}
                  >
                    <MenuItem value="">Select Language</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Nepali">Nepali</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label="Phone Number"
                    type="number"
                    placeholder="123-456-7890"
                    value={formData.phoneNumber}
                    onChange={handleTextFieldChange("phoneNumber")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label="Address"
                    placeholder="Enter address"
                    value={formData.address1}
                    onChange={handleTextFieldChange("address1")}
                  />
                </Grid>
              </Grid>
              {/* QRCODE GENERATOR SECTION */}
              <QRCODE />
            </TabPanel>
            <TabPanel value="account_details">
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label="Username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleTextFieldChange("username")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    type="email"
                    label="Email"
                    placeholder="user@domain.com"
                    value={formData.email}
                    onChange={handleTextFieldChange("email")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Study level"
                    value={formData.studylevel}
                    onChange={handleSelectChange("studylevel")}
                  >
                    <MenuItem value="">Select Study</MenuItem>
                    <MenuItem value="PrePrimary">Pre Primary</MenuItem>
                    <MenuItem value="Primary">Primary</MenuItem>
                    <MenuItem value="LowerSecondary">Lower Secondary</MenuItem>
                    <MenuItem value="HighSecondary">High Secondary</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Gender"
                    value={formData.gender}
                    onChange={handleSelectChange("gender")}
                  >
                    <MenuItem value="">Select Gender</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label="Password"
                    placeholder=""
                    id="form-layout-tabs-password"
                    type={formData.isPasswordShown ? "text" : "password"}
                    value={formData.password}
                    onChange={handleTextFieldChange("password")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={handleClickShowPassword}
                            onMouseDown={(e: MouseEvent<HTMLButtonElement>) =>
                              e.preventDefault()
                            }
                            aria-label="toggle password visibility"
                          >
                            {formData.isPasswordShown ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label="Confirm Password"
                    placeholder=""
                    id="form-layout-tabs-confirm-password"
                    type={formData.isConfirmPasswordShown ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleTextFieldChange("confirmPassword")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={(e: MouseEvent<HTMLButtonElement>) =>
                              e.preventDefault()
                            }
                            aria-label="toggle password visibility"
                          >
                            {formData.isConfirmPasswordShown ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginLeft: "auto" }}
            >
              Submit
            </Button>
            <Button
              type="reset"
              variant="outlined"
              color="secondary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </CardActions>
        </form>
      </TabContext>
    </Card>
  );
};

export default AddStudent;
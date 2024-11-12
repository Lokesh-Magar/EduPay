"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import KeySharpIcon from "@mui/icons-material/KeySharp";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import SentimentSatisfiedAltSharpIcon from "@mui/icons-material/SentimentSatisfiedAltSharp";
import ContactPhoneSharpIcon from "@mui/icons-material/ContactPhoneSharp";
import { TextField, InputAdornment,Box, CircularProgress, Grid, IconButton, Stack, Menu, MenuItem } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useRef ,useEffect} from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { createTheme } from "@mui/material/styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useForm,Controller } from "react-hook-form";

//Toast imports
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react"; 


const FeesGroupList = () => {
  const textFieldRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState<string | null>(null);

  //Summit Invoice function
const onSubmit = async (data:any,event:any) => {
  setLoading(true);
  setError(null);
  setSuccess(null);
  event.preventDefault();

  const {amount,pendingAmount}=data;
  // console.log(data);
  if (pendingAmount>amount) {
    toast.error("Pending amount cannot be greater than the Total Amount.");   
    return ;
  }
  else {
    try {
      const response = await axios.post('/invoice/invoicecreate',data);
      console.log("response",response.data);
      // setSuccess(response.data.message);
    
      toast.success(response.data.message);

      router.push('/dashboard/fees/feestype');
     
  } catch (err:any) {
          // setError(err.response.data.message('An error occurred'));
          toast.error('Invoice creation failed. Please try again.');
      
  } finally {
      setLoading(false);
      setError("");
   
  }
   
  }
  
};

  const handleFocus = () => {
    if (textFieldRef.current) {
      textFieldRef.current.placeholder = "";
    }
  };

  const handleBlur = () => {
    if (textFieldRef.current && textFieldRef.current.value === "") {
      textFieldRef.current.placeholder = "SEARCH";
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
    },
  });

   // ---- Check Authentication ----
   const router=useRouter();
   useEffect(()=>{
     const checkAuthentication= async()=>{
     
       try{
         const response = await axios.get('/auth/checkAuth',{withCredentials:true})
         if (response.status !== 200) {
           router.push('/backlogin'); // Redirect if not authenticated
         }
       }
       catch(error){
         router.push('/backlogin'); // Redirect if not authenticated
       }
       finally{
         setLoading(false);
       }
     }
     checkAuthentication();
     },[router]);

  return (
    <>
      <div className="flex ">
        <Typography variant="h6" component="h3">
          Fees Type
        </Typography>
        <nav style={{ marginLeft: "70.9%" }}>
          <Typography
            variant="h6"
            component="h3"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link href="#" style={{ marginRight: "25px" }}>
              Dashboard
            </Link>
            <span style={{ marginRight: "10px" }}>|</span>
            <Link href="#" style={{ marginRight: "25px" }}>
              Fees
            </Link>
            <span style={{ marginRight: "25px" }}>|</span>
            <Link href="#">Fees Type</Link>
          </Typography>
        </nav>
      </div>
      <div className="flex" style={{ display: "flex" }}>
        {/* Add invoice first card */}
        <div className="invoiceGroup mt-7">
          <Card sx={{ width: 400, height: 550 }}>
            <CardContent>
              <Typography variant="h6" component="h3" className="mb-1">
                Add Invoice
              </Typography>
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
            <Box>
              <Stack mb={3}>
              <Box>
              <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "35ch" },
              }}
              noValidate
                //   autoComplete="off"
                // onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
             margin="normal"
             fullWidth
             id="username"
             label="StudentID"
             className="username"
             
             autoComplete="username"
             autoFocus
             {...register('username', { required: 'Student ID is required' })}
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
              className="email"
              autoComplete="email"
              autoFocus
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
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
                id="amount"
                className="amount"
                label="Amount"
                placeholder="Enter the number"
                autoComplete="amount"
                // helperText={errors.phone?.message}
                autoFocus
                {...register('amount',{required:'Amount is required.'})}
            
              />
              <TextField
              
                label="Pending Amount"
                id="pendingAmount"
                className="pendingAmount"
                
                autoFocus
                {...register('pendingAmount',{required:'Pending Amount is required.'})}
                variant="outlined"
                // helperText={errors.password?.message}
             />
               <TextField
                variant="outlined"
                id="dueDate"
                className="dueDate"
                label="Due Date"
               type='date'
                // helperText={errors.phone?.message}
                autoFocus
                {...register('dueDate',{required:'Due Date is required.'})}
                InputLabelProps={{
                  shrink: true, // Keeps label visible when date is selected
                }}
              />
             
                <TextField
                variant="outlined"
                id="status"
                className="status"
                select
                defaultValue="unpaid"
                label="Status"
                autoFocus
                {...register('status',{required:'Status is required.'})}
            
              >
                <MenuItem value="unpaid">Unpaid</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                </TextField>
            </Box>
          </Box>
        </Stack>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
        <Button
          color="primary"
          variant="contained"
          size="large"
          type='submit'
          onClick={handleSubmit(onSubmit)}
          fullWidth >
          Add Fee Invoice {loading ? <CircularProgress size={24} /> : ''}
        </Button>
      </Box>
    </Box>
            </CardContent>
          </Card>
        </div>


        {/* Invoice Group list 2nd card */}
        <div className="feesList mt-7 mx-6" style={{ flex: 1 }}>
          <Card sx={{ width: "102%", height: "105%" }}>
            <CardContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h6"
                  component="h3"
                  style={{ flex: 1, marginRight: "16%" }}
                >
                  Fees Group List
                </Typography>
                <div style={{ flexGrow: 1 }}>
                  <TextField
                    id="standard-search"
                    variant="standard"
                    placeholder="SEARCH"
                    inputRef={textFieldRef}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchSharpIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="Basic button group"
                    sx={{
                      "& .MuiButton-root": {
                        fontSize: "1.2rem",
                        padding: "4px 8px",
                        backgroundColor: "transparent",
                        borderColor: "currentColor",
                        color: "currentColor",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.08)",
                          borderColor: "currentColor",
                        },
                        boxShadow: "none",
                      },
                    }}
                  >
                    <Button title="Copy Table">
                      <Icon icon="material-symbols:file-copy-outline-sharp" />
                    </Button>
                    <Button title="Export to Excel">
                      <Icon icon="mdi:file-excel-outline" />
                    </Button>
                    <Button title="Export to CSV">
                      <Icon icon="mdi:file-document-outline" />
                    </Button>
                    <Button title="Export to PDF">
                      <Icon icon="mdi:file-pdf-outline" />
                    </Button>
                    <Button title="Print">
                      <Icon icon="fa:print" style={{ fontSize: "1rem" }} />
                    </Button>
                    <Button title="Action">
                      <Icon
                        icon="mdi:table"
                        style={{
                          fontSize: "1.3rem",
                        }}
                      />
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
              {/* Table */}
              <div style={{ marginTop: "20px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          backgroundColor: "lightgray",
                          borderRadius: "5px 0 0 5px",
                          position: "relative", // Required for rounded corners
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                          <span>Name</span>
                        </div>
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          backgroundColor: "lightgray",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                          <span>Description</span>
                        </div>
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          backgroundColor: "lightgray",
                          borderRadius: "0 5px 5px 0",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                          <span>Action</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "8px" }}>Sample Name 1</td>
                      <td style={{ padding: "8px" }}>Sample Description 1</td>
                      <td style={{ padding: "5px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ borderRadius: "20px" }}
                        >
                          SELECT <ArrowDownwardIcon />
                        </Button>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "8px" }}>Sample Name 2</td>
                      <td style={{ padding: "8px" }}>Sample Description 2</td>
                      <td style={{ padding: "5px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ borderRadius: "20px" }}
                        >
                          SELECT <ArrowDownwardIcon />
                        </Button>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "8px" }}>Sample Name 3</td>
                      <td style={{ padding: "8px" }}>Sample Description 3</td>
                      <td style={{ padding: "5px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ borderRadius: "20px" }}
                        >
                          SELECT <ArrowDownwardIcon />
                        </Button>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "8px" }}>Sample Name 4</td>
                      <td style={{ padding: "8px" }}>Sample Description 4</td>
                      <td style={{ padding: "5px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ borderRadius: "20px" }}
                        >
                          SELECT <ArrowDownwardIcon />
                        </Button>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "8px" }}>Sample Name 5</td>
                      <td style={{ padding: "8px" }}>Sample Description 5</td>
                      <td style={{ padding: "5px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ borderRadius: "20px" }}
                        >
                          SELECT <ArrowDownwardIcon />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
            {/* Pagination */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              <Typography variant="body2" style={{ marginLeft: "16px" }}>
                Showing 1 to 3 of 3 entries
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                  cursor: "pointer",
                }}
              >
                <Button
                  size="small"
                  style={{
                    color: "black",
                    marginRight: "10px",
                    padding: "4px 8px",
                    width: "30px",
                    minWidth: "auto",
                    border: "none",
                  }}
                >
                  <ArrowBackIcon style={{ fontSize: "16px" }} />
                </Button>
                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    padding: "4px 16px",
                    borderRadius: "4px",
                    background: theme.palette.primary.main,
                    cursor: "pointer",
                  }}
                >
                  1
                </Typography>
                <Button
                  size="small"
                  style={{
                    color: "black",
                    marginLeft: "10px",
                    padding: "4px 8px",
                    width: "30px",
                    minWidth: "auto",
                    border: "none",
                  }}
                >
                  <ArrowForwardIcon style={{ transform: "scale(0.8)" }} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
export default FeesGroupList;

"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SentimentSatisfiedAltSharpIcon from "@mui/icons-material/SentimentSatisfiedAltSharp";
import { TextField, InputAdornment, CircularProgress, Box, DialogContent, DialogActions, Dialog, DialogContentText, DialogTitle, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, Controller } from "react-hook-form";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Autocomplete from '@mui/material/Autocomplete';


const FeesInvoiceList = () => {
  const textFieldRef = useRef<HTMLInputElement>(null);
  
  const {  control,register, handleSubmit,setValue, formState: { errors } } = useForm();
  const [students, setStudents] = useState([]);
  const [emails,setEmails] = useState([]);
  const [phone,setPhones] = useState([]);
  
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState<string | null>(null);

  //Dialog Box States
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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

  //Prediction Button Event Handling

  const handlePredict = async (invoice:any) => {
   
    const { amount, pendingAmount, dueDate, _id, email } = invoice;
    const inputData = {
      amount,
      pendingAmount,
      dueDate,
      email,
      invoiceId: _id
    };
  
    try {
      
      const response = await axios.post('/predict', inputData);
  
      const predictionResult = response.data.predictionResult;
    
  
      toast.error(`Prediction for invoice ${_id} (Email: ${email}):\n${predictionResult}`);
  
    } catch (error) {
     
      console.error('Error predicting invoice:', error.message);
      alert("Error predicting the invoice status.");
    }
  };

    //Edit Invoice 
    const [editOpen, setEditOpen] = useState(false); // State for edit dialog
    const [currentInvoice, setCurrentInvoice] = useState({});

    //Edit Invoice Dialog
    const handleEditOpen = (invoice:any) => {
      
      if (!invoice) {
        console.error("No invoice provided:", invoice);
        return; 
      }
      // console.log("Invoice passed:", invoice);
      // setCurrentInvoice(invoice || {}); 
      setCurrentInvoice({...invoice});
      setEditOpen(true);
    };

    const handleEditClose = () => {
      setEditOpen(false);
    };
    //Submit edit invoice function
    const handleEditSubmit = async (updatedInvoice:any) => {

      setError(null);
      setSuccess(null);
      if (!updatedInvoice.amount || !updatedInvoice.email || !updatedInvoice._id  ) {
        toast.error("Check your all of the fields are required.");
        
        return;
      }
      else if (updatedInvoice.pendingAmount!=updatedInvoice.amount) {
        toast.error("Pending should match to the Total Amount.");   
        return ;
      }

      try {

        const response = await axios.put(`/invoice/update/${updatedInvoice._id}`, updatedInvoice);
        setSuccess(response.data.message);
        toast.success("Invoice updated successfully!");
        
        // Update the local state to reflect changes
        setData((prevData:any) =>
          prevData.map((invoice:any) =>
            invoice._id === updatedInvoice._id ? updatedInvoice : invoice
          )
        );
    
      } catch (error:any) {
        setError(error.response.data.message);
        toast.error("Failed to update invoice. Please try again.");
      }

      setEditOpen(false);
    };


  //Submit Invoice function
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
        const response = await axios.post('/invoice/invoicecreate', data);
        // console.log(response.data);
        setSuccess(response.data.message);
      
        
        // toast.success(response.data.message);
        
        
  
        router.push('/dashboard/fees/feesinvoice');
       
    } catch (err:any) {
            setError('An error occurred');
            // toast.error('Invoice creation failed. Please try again.');
        
    } finally {
        setLoading(false);
        setError("");
        //Closes the dialog after submission
        setOpen(false);
      } 
    }
  };

  //-------------------------useEffect For loading Fee Invoice Data//-------------------------------------
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Limit the data per page  


const [totalEntries, setTotalEntries] = useState(0);
const [totalPages, setTotalPages] = useState(1); 
// Handle page change (for example, in a pagination component)
//PageNumber

const [pageNumber,setpageNumber]=useState(1);
const handlePageChange = (newPage: number,pageNumber:number) => {
  setPage(newPage);
  setpageNumber(pageNumber);
};

const startEntry = (page - 1) * limit + 1;
const endEntry = Math.min(page * limit, totalEntries);


  useEffect(() => {
  const fetchData = async()=>{
    try{
      // const source = axios.CancelToken.source();
      const response =await axios.get('/invoice/fetchInvData',{params:{page:page,limit:limit,type:"paginated"}});

      // const result= await response.json();
      setData(response.data);
      
      setTotalEntries(response.data.total);
      setTotalPages(response.data.totalPages);
      toast.success(response.data.message);
      // console.log('Fetched data:', response.data); 
   
    }
    catch (error){
      console.log("Error fetching the invoice data",error);}
  }
  
  fetchData();
},[page,limit]);

const [loading, setLoading] = useState(false);
   // ---- Check Authentication ----
   const router=useRouter();
  
  //  useEffect(()=>{
  //    const checkAuthentication= async()=>{
     
  //      try{
  //        const response = await axios.get('/auth/checkAuth',{withCredentials:true})
  //        if (response.status !== 200) {
  //          router.push('/backlogin'); // Redirect if not authenticated
  //        }
  //      }
  //      catch(error){
  //        router.push('/backlogin'); 
  //      }
  //      finally{
  //        setLoading(false);
  //      }
  //    }
  //    checkAuthentication();
  //    },[router]);

  // Fetch students from API
  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await axios.get('/student/fetchStudents'); 
        // console.log('Fetched students:', response.data); 
        setStudents(response.data.map((students: any) => students.fullname));
        setEmails(response.data.map((students: any) => students.email));
        setPhones(response.data.map((students: any) => students.phone));
      } catch (error) {
        console.error('Error fetching students:', error);
        toast.error('Error fetching students. Please try again.');
      }
    };
    fetchAllStudents();
  }, []);

  const handleStudentChange = (studentId: string) => {
    // Find the corresponding email for the selected Student ID
    const index = students.indexOf(studentId);
    if (index !== -1) {
      // Set the email automatically based on the selected Student ID in ADD INVOICE DIALOG
      setValue('email', emails[index]); // Update the email field in the form
      // setPhones(phone[index]);  // Update the phone field in the form
      setValue('phone', phone[index]);
    }
  };

  return (
    <>
      <div className="flex ">
        <Typography variant="h6" component="h3">
          Fees Invoice
        </Typography>
        <nav style={{ marginLeft: "auto" }}>
          <Typography
            variant="h6"
            component="h3"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link href="/dashboard" style={{ marginRight: "35px" }}>
              Dashboard
            </Link>
          
            <span style={{ marginRight: "35px" }}>|</span>
            <Link href="/dashboard/fees/feesinvoice">Fees Invoice</Link>
          </Typography>
        </nav>
      </div>

      {/* Fees Group list 1st card */}
      <div className="feesList mt-7 " style={{ flex: 1 }}>
        <Card sx={{ width: "100%", height: "105%" }}>
          <CardContent>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                component="h3"
                style={{ flex: 1, marginRight: "16%" }}
              >
                <Button variant="contained" onClick={handleClickOpen}>+ ADD</Button>
              </Typography>
        
              <div>

              {/* <Button variant="outlined" >
                Open Dialog
              </Button> */}

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"Add Fees Invoice"}</DialogTitle>
                <DialogContent>
        
        
        <Box component="form">
        <Controller
        name="studentId"
       
        control={control}
        rules={{ required: 'Student ID is required' }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={students}
            disablePortal
            sx={{ width: 300 }}
            renderInput={(params) => (
            
              <TextField
                {...params}
                label="Student ID"
                sx={{ mt: 2,width:'184%' }}
                error={!!errors.studentId}
                fullWidth
                // helperText={errors.studentId?.message}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SentimentSatisfiedAltSharpIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            onChange={(_, value) => {
              field.onChange(value); 
              handleStudentChange(value); 
            }} 
          />
        )}
      />
          
          <TextField
            margin="normal"
            fullWidth
            id="email"
            sx={{ mt: 3}}
            label="Email"
            disabled
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            onChange={(e) =>
              setCurrentInvoice((prev) => ({ ...prev, email: e.target.value }))
            }
           
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
            margin="normal"
            fullWidth
            id="phone"
            label="Phone"
            disabled
            {...register('phone', { required: 'Phone is required' })}
            error={!!errors.phone}
            // value={phone}
            onChange={(e) =>
              setCurrentInvoice((prev) => ({ ...prev, phone: e.target.value }))
            }
           
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneIcon />
                </InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 10, // Enforce a maximum length of 10 characters
            }}
          />
          
          <TextField
            margin="normal"
            fullWidth
            id="amount"
            label="Amount"
            {...register('amount', { required: 'Amount is required'
             })}
            error={!!errors.amount}
          
            variant="outlined"
            type="number"
          />
          
          <TextField
            margin="normal"
            fullWidth
            id="pendingAmount"
            label="Pending Amount"
            {...register('pendingAmount', { required: 'Pending Amount is required' })}
            error={!!errors.pendingAmount}
            
            variant="outlined"
            type="number"
          />
          
          <TextField
            margin="normal"
            fullWidth
            id="dueDate"
            label="Due Date"
            type="date"
            {...register('dueDate', { required: 'Due Date is required' })}
            error={!!errors.dueDate}
           
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          
          <TextField
            margin="normal"
            fullWidth
            id="status"
            label="Status"
            defaultValue="unpaid"
            select
            {...register('status', { required: 'Status is required' })}
            error={!!errors.status}
            
            variant="outlined"
          >
            <MenuItem value="unpaid">Unpaid</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
          </TextField>
          
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">{success}</Typography>}
          
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
          
          <Button
          onClick={handleSubmit(onSubmit)}
            color="primary"
            variant="contained"
            size="large"
            type="submit"
            fullWidth
            sx={{ mt: 2}}
            disabled={loading}
          >
            Add Fee Invoice {loading ? <CircularProgress size={24} /> : ''}
          </Button>
        </Box>
      </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for editing invoice */}

      <Dialog open={editOpen} onClose={handleEditClose}>
  <DialogTitle>Edit Invoice</DialogTitle>
  {/* Use reference for variables in d */}
  <DialogContent>
    <TextField
      label="Transaction ID"
      value={currentInvoice?._id || ''}
      onChange={(e) =>
        setCurrentInvoice((prev) => ({ ...prev, transId: e.target.value }))
      }
      fullWidth
      margin="normal"
      error={!!errors._id}
      helperText={errors._id?.message}
    />
    <TextField
      label="Amount"
      type="number"
      value={currentInvoice?.amount || ''}
      onChange={(e) =>
        setCurrentInvoice((prev) => ({ ...prev, amount: e.target.value }))
      }
      fullWidth
      margin="normal"
      error={!!errors.amount}
      helperText={errors.amount?.message}
    />
    <TextField
      label="Pending Amount"
      type="number"
      value={currentInvoice?.pendingAmount || ''}
      onChange={(e) =>
        setCurrentInvoice((prev) => ({ ...prev, pendingAmount: e.target.value }))
      }
      fullWidth
      margin="normal"
      error={!!errors.pendingAmount}
      helperText={errors.pendingAmount?.message || 'Pending amount should match to the total amount.'}
    />
    <TextField
      label="Email"
      value={currentInvoice?.email || ''}
      onChange={(e) =>
        setCurrentInvoice((prev) => ({ ...prev, email: e.target.value }))
      }
      fullWidth
      margin="normal"
      error={!!errors.email}
      helperText={errors.email?.message || 'Email is required'}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleEditClose}>Cancel</Button>
    <Button
      onClick={() => handleEditSubmit(currentInvoice)}
      color="primary"
      variant="contained"
    >
      Save Changes
    </Button>
  </DialogActions>
</Dialog>

    </div>
                         </div>
            {/* Table */}
            <div style={{ marginTop: "20px" }}>
              
              {loading ? (
        <CircularProgress />
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <th style={{ padding: '8px' }}>SN</th>
              <th style={{ padding: '8px' }}>STUDENT INVOICE ID</th>
              <th style={{ padding: '8px' }}>EMAIL</th>
              <th style={{ padding: '8px' }}>AMOUNT</th>
              <th style={{ padding: '8px' }}>PENDING AMOUNT</th>
              <th style={{ padding: '8px' }}>DUE DATE</th>
              
              <th style={{ padding: '5px' }}>STATUS</th>
              
              <th style={{ padding: '8px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginLeft: 8 }}>{index + 1}</span>
                </td>
                <td style={{ padding: '8px' }}>{item._id}</td>
                <td style={{ padding: '8px' }}>{item.email}</td>
                <td style={{ padding: '8px' }}>{item.amount}</td>
                <td style={{ padding: '8px' }}>{item.pendingAmount}</td>
                <td style={{ padding: '8px' }}>{new Date(item.dueDate).toLocaleDateString()}</td>
            
                {/* <td style={{ padding: '8px' }}>{item.balance}</td> */}
                <td style={{ padding: '5px' }}>
                  <Button variant="outlined" size="small" style={{ borderRadius: '5px' }}>
                    {item.status}
                  </Button>
                </td>
               
                <td style={{ padding: '8px' }}>
                {item.status==='unpaid' || item.status==='Failure' ? 
                (

                <div>
                 {/* {data.map((invoice) => ( */}
                        {/* <div key={invoice._id}> */}
                          <Button onClick={() => handleEditOpen(item)}>Edit</Button>
                        {/* </div>
                      ))} */}

                {/* <Button
                            variant="contained"
                                color="primary"
                                disabled={item.status === "Success" || item.status === "paid"} 
                                onClick={() => handlePredict(item)} 
                              >
                              Predict
                            </Button> */}
                 
                  </div>
          
                ):
                    ( <Typography variant="h6" style={{ borderRadius: '5px' }}>
                    Not Available
                    </Typography>)}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
            Showing {startEntry} to {endEntry} of {totalEntries} entries
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
                onClick={() => handlePageChange(page - 1,pageNumber-1)} 
                disabled={page === 1}
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
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  marginRight: "8px",
                  background: theme.palette.primary.main,
                  "&:hover": {
                    background: theme.palette.primary.main,
                  },
                }}
              >
                {pageNumber}
              </Typography>
              <Button
                size="small"
                onClick={() => handlePageChange(page + 1,pageNumber+1)} 
                disabled={page === totalPages}
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
    </>
  );
};

export default FeesInvoiceList;

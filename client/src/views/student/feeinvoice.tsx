"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import {Box} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField, InputAdornment ,CircularProgress} from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { createTheme } from "@mui/material/styles";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CryptoJS from 'crypto-js';
// import QRCODE from "../qrCode/qrCode";
import QRCode from "qrcode";
//Toast imports
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "@/UserContext";
import QRCODE from "../qrCode/qrCode";

const FeesInvoiceList = () => {
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  //Redirect set state
  const[itemId, setItemId] = useState("");
  const[transId, setTransId] = useState("");
  const[transAmt, setTransAmt] = useState(0);

  //QR state
  // const invoiceData= useState({"eSewa_id":"9803431247","name":"Nirmala Adhikari Kaduwal"});
 
  // const [qrCode, setQrCode] = useState("");

  // const GenerateQRCode = () => {
  //   const dataToEncode = JSON.stringify(invoiceData);
  //   QRCode.toDataURL(
  //     dataToEncode,
  //     {
  //       width: 800,
  //       margin: 2,
  //       color: {
  //         dark: "#000000ff",
  //         light: "#ffffffff",
  //       },
  //     },
  //     (err, url) => {
  //       if (err) return console.error(err);
  //       setQrCode(url);
  //     }
  //   );
  // };

  const handleClickOpen = (id,tAmt) => {
    setOpen(true);
    // GenerateQRCode();
    setTransId(crypto.randomUUID());
    setItemId(id);
    setTransAmt(tAmt);
    console.log(id);
    console.log(tAmt);
   
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

//-------------------------useEffect For loading Fee Invoice Data//-------------------------------------
const [data, setData] = useState([]);
const { username, email ,invAmt} = useUser();
const {setUser} = useUser();

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
 
//Use Effect for fetching the invoice data in Student portal
useEffect(() => {
const fetchData = async()=>{
  try{
    const response =await axios.get('/invoice/fetchStudInvData',{params:{email:email,page:page,limit:limit,type:"paginated"}});
    setData(response.data);
    setTotalEntries(response.data.total);
    setTotalPages(response.data.totalPages);
   
    toast.success("Data Fetched Successfully");
  }
  catch (error){
    toast.error("Error fetching the invoice data");}
}
fetchData();
},[email,page,limit]);


 // ---- Check Authentication ----
 const router=useRouter();
 const [loading, setLoading] = useState(true);
 useEffect(()=>{
   const checkAuthentication= async()=>{
   
     try{
       const response = await axios.get('/auth/checkAuth',{withCredentials:true})
       if (response.status !== 200) {
         router.push('/backlogin'); 
       }
     }
     catch(error){
       router.push('/backlogin'); 
     }
     finally{
       setLoading(false);
     }
   }
   checkAuthentication();
   },[router]);

//   const onSubmit = async (payment_method: string) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await axios.post('/initialize-esewa');
//       console.log(response);
//       setSuccess(response.data.message);
//       router.push('/portal')

//   } catch (err:any) {
//       if (err.response) {
//           setError(err.response.data.message || 'An error occurred');
//       } else {
//           setError("An error occurred");
//       }
//   } finally {
//       setLoading(false);
//   }
// };

//Generate Hash
// const [hashInBase64, setHashInBase64] = useState('');
// const [cryptoLoaded, setCryptoLoaded] = useState(false);

// useEffect(() => {
//   // Check if CryptoJS is loaded
//   if (CryptoJS) {
//     setCryptoLoaded(true);
//   }
// }, []);

const generateHash = () => {
 

  const hash = CryptoJS.HmacSHA256(
    `total_amount=${transAmt+10},transaction_uuid=${transId},product_code=EPAYTEST`,
    '8gBm/:&EnhH.1/q'
  );
  const hashBase64 = CryptoJS.enc.Base64.stringify(hash);
  // setHashInBase64(hashBase64);
  return hashBase64;
};

//Form Submit under Add button setting
 const signature = generateHash();
// console.log(signature);

// ---- Loading State ----
// const router=useRouter();

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
            <Link href="/portal" style={{ marginRight: "35px" }}>
              Portal
            </Link>
           
            
            <span style={{ marginRight: "35px" }}>|</span>
            <Link href="/portal/student/feesinvoice">Fees Invoice</Link>
          </Typography>
        </nav>
      </div>
      {/* Fees Group list 1st card */}
      <div className="feesList mt-7 " style={{ flex: 1 }}>
        <Card sx={{ width: "100%", height: "105%" }}>
          <CardContent>
            <div style={{ display: "flex", alignItems: "center" }}>
           
              <div>
              {/* <Button variant="outlined" >
                Open Dialog
              </Button> */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Esewa Payment Redirect"}</DialogTitle>
        
        <DialogContent>
          <DialogContentText>
          <QRCODE/>
           You are about to leave this page. Scan the <b>QR code </b> or Press <b>PAY NOW</b> button to continue.
          </DialogContentText>
          <Box component="form" action={"https://rc-epay.esewa.com.np/api/epay/main/v2/form"} method="POST" target="_blank" >
          <TextField hidden label="Amount" name="amount" defaultValue={transAmt}  required fullWidth />
          <TextField hidden label="Tax Amount" name="tax_amount" defaultValue="10" required fullWidth />
          <TextField hidden label="Total Amount" name="total_amount" defaultValue={transAmt+10} required fullWidth />
          <TextField hidden label="Transaction UUID" name="transaction_uuid" defaultValue={transId} required fullWidth />
          <TextField hidden label="Product Code" name="product_code" defaultValue="EPAYTEST" required fullWidth />
          <TextField hidden label="Product Service Charge" name="product_service_charge" defaultValue="0" required fullWidth />
          <TextField hidden label="Product Delivery Charge" name="product_delivery_charge" defaultValue="0" required fullWidth />
          <TextField hidden label="Success URL" name="success_url" defaultValue={`http://localhost:3000/portal/success/${itemId}`} required fullWidth />
          <TextField hidden label="Failure URL" name="failure_url" defaultValue={`http://localhost:3000/portal/failure/${itemId}`} required fullWidth />
          <TextField hidden label="Signed Field Names" name="signed_field_names" defaultValue="total_amount,transaction_uuid,product_code" required fullWidth />
          <TextField hidden label="Signature" name="signature" value= {signature} required fullWidth />

          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Pay Now
          </Button>
          </Box>
          {/* <Button variant="contained" onClick={generateHash}>Generate Hash</Button> */}
          {/* {hashInBase64 && <p>Hash (Base64): {hashInBase64}</p>} */}

          {/* <Button variant="contained"
                  onClick={()=> onSubmit("esewa")}
                >+ PAY</Button> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
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
              <th style={{ padding: '8px' }}>Transcation ID</th>
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
                <td style={{ padding: '8px' }}>{email}</td>
                <td style={{ padding: '8px' }}>{item.amount}</td>
                <td style={{ padding: '16px' }}>{item.pendingAmount}</td>
                <td style={{ padding: '8px' }}>{new Date(item.dueDate).toLocaleDateString()}</td>
                <td style={{ padding: '8px' }}> <Button variant="outlined" size="small" style={{ borderRadius: '5px' }}>
                                                  {item.status}
                                                  </Button>
                                                            </td>
               
                <td style={{ padding: '5px' }}>
      {item.status==='unpaid' || item.status==='failure' ? (<Button variant="contained" size="small" onClick={()=>handleClickOpen(item._id,item.amount)}>Pay</Button>):
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
                onClick={() => handlePageChange(page - 1,pageNumber-1)} disabled={page === 1}
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
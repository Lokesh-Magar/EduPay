"use client";
import { Grid, Box, Typography } from "@mui/material";
import PageContainer from "@/app/(PortalLayout)/components/container/PageContainer";

import FeesBreakup from "@/app/(PortalLayout)/components/portal/FeesBreakup";
import RecentTransactions from "@/app/(PortalLayout)/components/portal/RecentTransactions";
import ProductPerformance from "@/app/(PortalLayout)/components/portal/ProductPerformance";
import InvoiceClearings from "@/app/(PortalLayout)/components/portal/InvoiceClearings";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/UserContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FeesOverview from "@/app/(DashboardLayout)/components/dashboard/FeesOverview";

const Portal = () => {

const router=useRouter();
const [loading, setLoading] = useState(true);


const [invoices, setInvoices] = useState([]);
  // const [loading, setLoading] = useState(true);

  //fetch the data for analysis
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/invoice/fetchStudInvData"); // this endpoint returns all invoices
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


 const { username, email } = useUser();   
 
 const {setUser} = useUser();
 console.log("Username is",username);



//Check authentication useEffect
useEffect(()=>{
const checkAuthentication= async()=>{

  try{
    const response = await axios.get('/auth/checkAuth',{withCredentials:true});

    if (response.status !== 200) {
      router.push('/'); 
    }
   
  }
  catch(error){
    router.push('/'); 
  }
  finally{
    setLoading(false);
  }
}
checkAuthentication();
},[router]);



if(loading) {return <div>Loading...</div>}

  return (
    <PageContainer title="Student Portal" description="This is Student Portal.">
     <Typography variant='h5'>Welcome, {username}</Typography>
     {/* <div>
  {data.map((item, index) => (
    <h1 key={index}>Welcome, {item.email}</h1>
  ))}
</div> */}

<h1>Your fee/invoice details here.</h1>
<Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <FeesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FeesBreakup invoices={invoices}/>
              </Grid>
              <Grid item xs={12}>
                <InvoiceClearings invoices={invoices} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Portal;

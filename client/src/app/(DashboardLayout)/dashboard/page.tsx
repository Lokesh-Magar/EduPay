"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import FeesOverview from "@/app/(DashboardLayout)/components/dashboard/FeesOverview";
import UploadCSV from "@/app/(DashboardLayout)/components/dashboard/CSVUploader";
import RecentTransactions from "@/app/(DashboardLayout)/components/dashboard/RecentTransactions";
import FeesPerformance from "@/app/(DashboardLayout)/components/dashboard/FeesPerformance";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import FeesBreakup from "@/app/(DashboardLayout)/components/dashboard/FeesBreakup";
import InvoiceClearings from "@/app/(DashboardLayout)/components/dashboard/InvoiceClearings";

const Dashboard = () => {
const router=useRouter();
const [loading, setLoading] = useState(true);

const [invoices, setInvoices] = useState([]);

//Use Effect for fetching data as analysis
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/invoice/fetchInvData",{params:{type:"analysis"}}); 
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

if(loading) {return <div>Loading...</div>}
  return (
    <PageContainer title="Dashboard" description="This is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <FeesOverview invoices={invoices}/>
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
            <UploadCSV />
        </Grid>
          <Grid item xs={12} lg={8}>
            <FeesPerformance invoices={invoices}/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default Dashboard;

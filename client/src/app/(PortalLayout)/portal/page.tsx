"use client";
import { Grid, Box, Typography } from "@mui/material";
import PageContainer from "@/app/(PortalLayout)/components/container/PageContainer";




import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/UserContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FeesOverview from "../components/portal/FeesOverview";
import FeesBreakup from "../components/portal/FeesBreakup";
import InvoiceClearings from "../components/portal/InvoiceClearings";
import RecentTransactions from "../components/portal/RecentTransactions";
import FeesPerformance from "../components/portal/FeesPerformance";


const Portal = () => {
  const router=useRouter();
  const [loading, setLoading] = useState(true);
  
  const [invoices, setInvoices] = useState([]);
  const { email} = useUser();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("/invoice/fetchStudInvData",{params:{email:email,type:"analysis"}});
          setInvoices(response.data);
        } catch (error) {
          console.error("Error fetching invoices:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [email]);
  
  useEffect(()=>{
  const checkAuthentication= async()=>{
  
    try{
      const response = await axios.get('/auth/checkAuth',{withCredentials:true})
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
              <FeesPerformance invoices={invoices}/>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
    );
  };
  export default Portal;
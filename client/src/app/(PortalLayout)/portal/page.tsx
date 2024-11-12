"use client";
import { Grid, Box, Typography } from "@mui/material";
import PageContainer from "@/app/(PortalLayout)/components/container/PageContainer";
import SalesOverview from "@/app/(PortalLayout)/components/portal/SalesOverview";
import YearlyBreakup from "@/app/(PortalLayout)/components/portal/YearlyBreakup";
import RecentTransactions from "@/app/(PortalLayout)/components/portal/RecentTransactions";
import ProductPerformance from "@/app/(PortalLayout)/components/portal/ProductPerformance";
import MonthlyEarnings from "@/app/(PortalLayout)/components/portal/MonthlyEarnings";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/UserContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Portal = () => {

const router=useRouter();
const [loading, setLoading] = useState(true);

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
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
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

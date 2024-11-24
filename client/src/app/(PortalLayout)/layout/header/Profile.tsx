import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {useRouter} from 'next/navigation';
import axios from "axios";
import { useUser } from "@/UserContext";
import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { toast } from "react-toastify";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState<string | null >(null);

  //Context variables
  const { username, email } = useUser();   
 
 const {setUser} = useUser();

  const router = useRouter();

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  //Check authentication useEffect
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
  const signout = async () => {
    setError(null);
    setLoading(true);  // Start loading
    
    // console.log("Logout Pressed");

    try {
      const response = await axios.post('/student/studsignout',
        {}, // Empty body since you only need to trigger the signout
        { withCredentials: true } 
      );

      // if (response.status === 200) {
   
        // localStorage.removeItem('access_token');

        router.push('/');
        toast.success("Logged Out Successfully");
      // } else {
        // setError(response.data.message || 'An error occurred during signout');
      }
    // }
    catch (err: any) {
      setError('An error occurred during signout');
    } 
    finally {
      setLoading(false); 
    }
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      > {username}
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          {/* <ListItemText>My Email</ListItemText> */}
          <ListItemText>{email}</ListItemText>
        </MenuItem>
     
        <Box mt={1} py={1} px={2}>
          <Button
            onClick={signout}
            variant="outlined"
            color="primary"
            fullWidth
            disabled={loading}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;

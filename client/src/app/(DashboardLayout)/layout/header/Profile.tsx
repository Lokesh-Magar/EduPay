//This is for student portal profile section dropdown with portal sign out.

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
import { toast, ToastContainer } from "react-toastify";
import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@/UserContext";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState<string | null >(null);

  const router = useRouter();


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


  //Context variables
  const { fullname, email } = useUser();   
  
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const signout = async () => {
    setError(null);
    setLoading(true);
    
    console.log("Logout Pressed");

    try {
      const response = await axios.post('/auth/signout',
        {},
        { withCredentials: true } 
      );
      toast.success("Logged Out Successfully");
      router.push('/backlogin');

    }
    catch (err: any) {
      setError('An error occurred during signout');
    } 
    finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <div className="name" style={{ marginRight: "10px" }}>{email}</div>
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="Profile"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
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
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            onClick={signout}  // Call signout directly without handleSubmit
            variant="outlined"
            color="primary"
            fullWidth
            disabled={loading}  // Disable button while loading
          >
            {loading ? 'Logging Out...' : 'Logout'}
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";
import Profile from "./Profile";
import { IconBellRinging, IconMenu } from "@tabler/icons-react";
import axios from "axios";
//Toast imports
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "@/UserContext";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  
  // Notification state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { username, email } = useUser();
  const {setUser} = useUser();  
  

  const handleNotificationClick = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    try {
      const response = await axios.get('/notifications/fetchStudNotifyData', 
        {
          params: { email :email}}
    );
      setData(response.data);
      toast.success("Notifications Fetched Successfully");
      console.log("Notification fetched");
    }

    catch (error){
      toast.error("Error fetching Notifications.")
    }
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const notifOpen = Boolean(anchorEl);
  const notId = notifOpen ? "notification-popover" : undefined;



  //UseEffect for Notification Fetch
  const [data, setData] = useState([]);


  // useEffect(()=>{

  //   const fetchNotifications = async () => {

      


  //   }

  //   fetchNotifications();
  // },[email,username]);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <IconButton
          size="large"
          color="inherit"
          onClick={handleNotificationClick}
          aria-label="show notifications"
        >
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5"  
            />
          </Badge>
        </IconButton>

        {/* Notification Popover */}
        <Popover
          id={notId}
          disableScrollLock
          open={notifOpen}
          anchorEl={anchorEl}
          onClose={handleNotificationClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Typography variant="h5" sx={{ p: 2 }}>
            Notifications
          </Typography>
          <List>
            {data.map((notification) => (
              
              <ListItem key={notification._id} button>
                <ListItemText primary={notification.message} />
                <Badge sx={{ ml: "8px" }} variant="dot" color="primary"/>
              </ListItem>
            ))}
                
            
          </List>
        </Popover>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  toggleMobileSidebar: PropTypes.func.isRequired,
};

export default Header;

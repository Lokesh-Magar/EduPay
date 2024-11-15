
import Notification from "../models/notification.model.js";

//Student Notification
export const getStudNotifyData = async (req, res) => {
    try {
      // Getting the data from the database
      const {email}=req.query;
        const data = await Notification.find({email:email});
                                    
        const totalNotifications = await Notification.countDocuments({email:email});//Count the total number of invoices
        // console.log('The Data from database:', data);
        
        res.json(data,{total:totalNotifications});
     
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving notifications.');
      } 
  };

  //Admin Notification 
  export const getAdminNotifyData = async (req, res) => {

    try {
      // Getting the data from the database
      const {email,username}=req.query;
      const data = await Notification.find();
                                    
  
       
       
        
        res.status(200).json(data);
     
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving datas');
      }
    }

  
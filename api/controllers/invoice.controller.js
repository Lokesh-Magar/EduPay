//Coded By Robin KC and Lokesh Magar
import Invoice from '../models/invoice.model.js';
import Student from '../models/student.model.js';

export const createInvoice = async (req, res) => {
    const { studentId,username,email, amount,pendingAmount, dueDate, status } = req.body;

    //Check if the student exists
    try {
      const student = await Student.find({username});
      if (!student) {
        console.log("Student not found");
        return res.status(404).send({ message: 'Student not found' });
      }

      const invoice = new Invoice({ studentId,username,email, amount,pendingAmount, dueDate, status });
      await invoice.save();
      res.status(201).send({ message: 'Invoice created successfully' });

    }

    catch (error){
      res.status(400).send({ message: 'Error creating invoice' });
    }
}
//Code for Fetching invoice data in ADMIN dashboard, shows all of the available invoices in the database //paignation not workig...
export const getInvData = async (req, res) => {
    try {
      // Getting the data from the database
        const {page=1,limit=10}=req.query;
        const data = await Invoice.find().skip((page - 1) * limit).limit(Number(limit));  // Skip the invoices and limit based on the page
      
        const totalInvoices = await Invoice.countDocuments();//Count the total number of invoices
        // console.log('The Data from database:', data);
        res.json(data,{total:totalInvoices},{page:Number(page)},{totalPages:Math.ceil(totalInvoices / limit)});

      } 
      catch (error) 
      {
        console.error(error);
        res.status(500).send('Error retrieving data.');
      } 
};

//Code for Fetching invoice data of related email or username
export const getStudInvData = async (req, res) => {
  try {
    // Getting the data from the database
    const {email,page=1,limit=10}=req.query;
      const data = await Invoice.find({email:email})
                                .populate('studentId','username')
                                .skip((page - 1) * limit)  // Skip the invoices based on the page
                                .limit(Number(limit));     // Limit the number of invoices per page;

      const totalInvoices = await Invoice.countDocuments({email:email});//Count the total number of invoices
      // console.log('The Data from database:', data);
      
      res.json(data,{total:totalInvoices},{page:Number(page)},{totalPages:Math.ceil(totalInvoices / limit)});
   
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving datas');
    } 
};




export const getStudent= async (req, res) => {
  try
  {
    const email = await Student.findOne({email}).populate('Student',[username,email]);
    if(!email){
      return res.status(404).send('User not found');}

      res.json(email);
  }
  catch (error){
    console.log("Error",error);
    res.status(500).send('Server Error');
  }
};



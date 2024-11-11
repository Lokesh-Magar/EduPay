//Coded By Robin KC and Lokesh Magar
import Invoice from '../models/invoice.model.js';
import Student from '../models/student.model.js';
export const createInvoice = async (req, res) => {
    const { studentId,email, amount,pendingAmount, dueDate, status } = req.body;
    const invoice = new Invoice({ studentId,email, amount,pendingAmount, dueDate, status });
    await invoice.save();
    res.status(201).send({ message: 'Invoice created successfully' });
}
//Code for Fetching invoice data in dashboard, shows all of the available invoices in the database
export const getInvData = async (req, res) => {
    try {
      // Getting the data from the database
      // const userEmail=req.users.email;
        const data = await Invoice.find();
        res.json(data);
        console.log('Data from database:', data);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
      } 
};

//Code for Fetching invoice data of related email or username
export const getStudInvData = async (req, res) => {
  try {
    // Getting the data from the database
    // const userEmail=req.users.email;
    const {email,page=1,limit=10}=req.query;
      const data = await Invoice.find({email:email})
                                .skip((page - 1) * limit)  // Skip the invoices based on the page
                                .limit(Number(limit));     // Limit the number of invoices per page;

      const totalInvoices = await Invoice.countDocuments({email:email});//Count the total number of invoices
      console.log('The Data from database:', data);
      
      res.json(data,{total:totalInvoices},{page:Number(page)},{totalPages:Math.ceil(totalInvoices / limit)});
      // return res.json({
      //   data,
      //   total: totalInvoices,
      //   page: Number(page),
      //   totalPages: Math.ceil(totalInvoices / limit),
      // });

     
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



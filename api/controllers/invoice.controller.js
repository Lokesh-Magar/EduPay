//Coded By Robin KC and Lokesh Magar 
import csv from 'csv-parser';
import fs from 'fs';
import Invoice from '../models/invoice.model.js';
import Student from '../models/student.model.js';
import Notification from '../models/notification.model.js';

export const createInvoice = async (req, res) => {
    const { fullname,email,phone, amount,pendingAmount, dueDate, status } = req.body;

    //Checks if the student exists

    try {

      const student = await Student.find({email});

      if (!student) {
        
        console.log("Student not found");
        return res.status(404).send({ message: 'Student not found' });
      }

      const invoice = new Invoice({ fullname,email,phone, amount,pendingAmount, dueDate, status  });
      invoice.save();

      const newNotification = new Notification({
       message: `New invoice added with amount ${amount}. Invoice ID: ${invoice._id}.`,
       email:email
     });
     newNotification.save();
      res.status(200).send({ message: 'Invoice created successfully' });

      // Create a Notification


    }

    catch (error){
      res.status(400).send({ message: 'Error creating invoice' });
    }
}
//Code for Fetching invoice data in ADMIN dashboard, shows all of the available invoices in the database //paignation not workig...
export const getInvData = async (req, res) => {
    try {
      // Getting the data from the database
        
        const {page=1,limit=10,type="paginated"}=req.query;

        if(type==="paginated"){
          const data = await Invoice.find().skip((page - 1) * limit).limit(Number(limit));  // Skip the invoices and limit based on the page
      
          const totalInvoices = await Invoice.countDocuments();
     
          res.json(data,{total:totalInvoices},{page:Number(page)},{totalPages:Math.ceil(totalInvoices / limit)});

        }
        else if (type==="analysis"){

          const data = await Invoice.find();
          res.json(data);
        }
        else {
          return res.status(400).json({ message: "Invalid type parameter" });
        }
        
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
   
    const {email,page=1,limit=10,type="paginated"}=req.query;
    if (type==="paginated"){
      const data = await Invoice.find({email:email})
      .populate('email')
      .skip((page - 1) * limit)  // Skip the invoices based on the page
      .limit(Number(limit));     // Limit the number of invoices per page;

        const totalInvoices = await Invoice.countDocuments({email:email});


        res.json(data,{total:totalInvoices},{page:Number(page)},{totalPages:Math.ceil(totalInvoices / limit)});
      
    }

    else if (type==="analysis"){
      const data = await Invoice.find({email:email})
      .populate('email');
      res.json(data);
    }
    
    else {
      return res.status(400).json({ message: "Invalid type parameter" });
    }
      
   
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving datas');
    } 
};

//Code for Fetching student data unused MAYBE
export const getStudent= async (req, res) => {
  try
  {
    const email = await Student.findOne({email}).populate('Student',[fullname,email]);
    if(!email){
      return res.status(404).send('User not found');}
      res.json(email);
  }
  catch (error){
    console.log("Error",error);
    res.status(500).send('Server Error');
  }
};

  export const updateInvoice =async(req,res)=>{
  
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    const newNotification = new Notification({
     message: `Your invoice has been updated. Invoice ID: ${updatedInvoice._id}, updated by system.`,
   });
   await newNotification.save();
   res.status(200).json(updatedInvoice);
    // await updatedInvoice.save();
  } catch (error) {
    res.status(500).json({ error: "Failed to update invoice" });
  }
}

//Calculates the fees overdue by Rs 500 if the amount issued is past the 1 week of due date which is unpaid.
export const processOverdueInvoices = async () => {
  try {
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Find overdue invoices (1 week past due date, unpaid)
    const overdueInvoices = await Invoice.find({
      status: 'Unpaid',
      dueDate: { $lte: oneWeekAgo },
    });

    for (const invoice of overdueInvoices) {
      // Calculate overdue weeks
      const weeksOverdue = Math.floor((now - invoice.dueDate) / (7 * 24 * 60 * 60 * 1000));

      // Expected fine amount
      const expectedFine = 500 * weeksOverdue;

      if (invoice.amount < expectedFine) {
        // Updates fine amount
        invoice.amount = expectedFine;

        const newNotification = new Notification({
          message:`Fine of Rs 500 has been added for the invoice ${invoice._id} of ${newUser.email} under the name ${newUser.username}`,
        }).find({email:email});

        newNotification.save();
        
        await invoice.save();
        // console.log(`Notification sent to user for Invoice ID: ${invoice._id}`);
      }
    }

    console.log("Overdue invoice processing complete.");
  } catch (error) {
    console.error("Error processing overdue invoices:", error);
  }
};

//FOR CSV UPLOAD

// Upload CSV logic
export const uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const invoices = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => {
        // Log each row to see what data is being parsed
        console.log('Parsed row:', row);

        const { fullname, email, amount, pendingAmount, dueDate, status } = row;

        // Validate and push if required fields are present
        if (fullname && email && amount && pendingAmount && dueDate) {
          const invoice = {
            fullname,
            email,
            amount: parseFloat(amount),
            pendingAmount: parseFloat(pendingAmount),
            dueDate: new Date(dueDate),
            status: status || 'unpaid', 
          };

          console.log('Valid invoice:', invoice); // Log the valid invoice being pushed

          invoices.push(invoice);
        } else {
          console.log('Skipping invalid row:', row); // Log if a row is skipped due to missing data
        }
      })
      .on('end', async () => {
        try {
          console.log('Invoices array before insert:', invoices); // Log before inserting
          await Invoice.insertMany(invoices); // Insert to the database
          console.log('Invoices inserted:', invoices);

          fs.unlinkSync(req.file.path); // Removes the uploaded file
          res.status(200).json({ message: 'CSV data uploaded successfully' });
        } catch (err) {
          console.error('Error inserting invoices:', err);
          res.status(500).json({ error: 'Error saving invoices to the database' });
        }
      });
  } catch (error) {
    console.error('Server error during CSV upload:', error);
    res.status(500).json({ error: 'Server error during CSV upload' });
  }
};


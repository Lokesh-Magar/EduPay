
import Invoice from '../models/invoice.model.js';
export const createInvoice = async (req, res) => {
    const { studentId,email, amount,pendingAmount, dueDate, status } = req.body;
    const invoice = new Invoice({ studentId,email, amount,pendingAmount, dueDate, status });
    await invoice.save();
    res.status(201).send({ message: 'Invoice created successfully' });
}

export const getInvData = async (req, res) => {
    try {
      // Getting the data from the database
        const data = await Invoice.find();
        res.json(data);
        console.log('Data from database:', data);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
      } 
};

// const getInvData = async (req, res) => {
//   try {
//     // Get the email from the query parameters
//     const { email } = req.query;

//     // Validate that an email is provided
//     if (!email) {
//       return res.status(400).json({ message: 'Email is required' });
//     }

//     // Query the invoices based on the email
//     const invoices = await Invoice.find({ email: email });

//     // If no invoices found for this email, return a message
//     if (invoices.length === 0) {
//       return res.status(404).json({ message: 'No invoices found for this email' });
//     }

//     // Send the invoices as a response
//     res.json(invoices);
//   } catch (error) {
//     console.error('Error fetching invoice data:', error);
//     res.status(500).json({ message: 'Error fetching invoice data' });
//   }
// };


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
      // const userEmail=req.users.email;
        const data = await Invoice.find();
        res.json(data);
        console.log('Data from database:', data);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
      } 
};

export const getStudInvData = async (req, res) => {
  try {
    // Getting the data from the database
    // const userEmail=req.users.email;
      const data = await Invoice.find();
      res.json(data);
      console.log('Data from database:', data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving datas');
    } 
};

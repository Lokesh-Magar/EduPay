
import Invoice from '../models/invoice.model.js';
export const createInvoice = async (req, res) => {
    const { studentId, amount, dueDate } = req.body;
    const invoice = new Invoice({ studentId, amount, dueDate });
    await invoice.save();
    res.status(201).send({ message: 'Invoice created successfully' });
}


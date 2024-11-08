
import mongoose from "mongoose";
// Invoice model in MongoDB
const invoiceSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    email: String,
    amount: Number,
    pendingAmount: Number,
    dueDate: Date,
    status: { type: String, default: 'unpaid' },
    
});
 
export default mongoose.model('Invoice',invoiceSchema);
// const Invoice = mongoose.model('Invoice', invoiceSchema);
// export default Invoice;
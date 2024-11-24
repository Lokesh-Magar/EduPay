// Preprocess the data to convert dates and encode categorical variables
export const processCSVData=(parsedData)=> {
    return parsedData.map(row => ({
      studentId: row.studentId,
      username: row.username,
      email: row.email,
      amount: row.amount,
      pendingAmount: row.pendingAmount,
      daysToPayment: row.days_to_payment,
      dueDate: new Date(row.dueDate).getTime(),
      paidDate: row.paidDate ? new Date(row.paidDate).getTime() : null, // Convert to timestamp, handle missing dates
      status: row.status === 'paid' ? 1 : 0 // Encoding 'paid' as 1 and 'unpaid' as 0
    }));
  }
  
  // Prepare the data by extracting features and labels
  export const prepareData=(data)=> {
    const inputs = data.map(row => [
      row.amount, 
      row.pendingAmount, 
      row.dueDate, 
      row.paidDate, 
      row.status 
    ]);
  
    const labels = data.map(row => row.daysToPayment); // Label: days to payment
  
    return { inputs, labels };
  }
  
 
  
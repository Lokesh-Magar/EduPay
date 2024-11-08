//Awaiting to be integrated:To be integrated

import Invoice from "../models/invoice.model.js";

export const getData = async (req, res) => {
    try {
      // Getting the data from the database
        const data = await Invoice.find({}).toArray();
        res.json(data);
        console.log('Data from database:', data);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
      } finally {
        await client.close();
      }
};
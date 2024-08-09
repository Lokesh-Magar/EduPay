// pages/api/your-api.ts
//api route with mongoose.
import type { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '../../lib/db';
import dbConnect from '../../../../lib/db';
// import YourModel from '../../models/YourModel';
import YourModel from '../../../../models/YourModel';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    const documents = await YourModel.find({});

    res.status(200).json({ documents });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

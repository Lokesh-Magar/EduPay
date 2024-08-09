// pages/api/your-api.ts
//api for login
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../lib/mongodb';
import { User } from '../../../../types/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db('your-database');

    const collection = db.collection<User>('your-collection');
    const documents = await collection.find({}).toArray();

    res.status(200).json({ documents });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

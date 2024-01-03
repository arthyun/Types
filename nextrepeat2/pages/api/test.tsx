import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../utils/database';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let method: string | undefined = req.method;
  let status: number = res.statusCode;

  // DB Access
  const client = await connectDB;
  const db = await client.db('forum');
  const list = await db.collection('post').find().toArray();

  // Calc today
  const today = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`;

  if (method === 'GET' && status === 200) return res.json(list);
  if (method === 'POST' && status === 200) return res.json(today);
};

export default handler;

import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../utils/database';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let method: string | undefined = req.method;

  if (method === 'POST') {
    if (req.body['title'] === '' || req.body['content'] === '') {
      return res.status(500).json('입력된 값이 없습니다.');
    }
    // DB Access
    const client = await connectDB;
    const db = await client.db('forum');
    const result = await db.collection('post').insertOne(req.body);
    return res.status(200).json('Success');
    // res.redirect(302, '/list');
  }
};

export default handler;

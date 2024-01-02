import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  let status: number = res.statusCode;
  if (status === 200) {
    console.log('Success');
    return res.json('test api server');
  }
};

export default handler;

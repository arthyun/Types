import React from 'react';
import { connectDB } from '../../../../utils/database';
import { ObjectId } from 'mongodb';

const Detail = async (props: { params: { id: string }; searchParams: {} }) => {
  const client = await connectDB;
  const db = client.db('forum');
  const result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div>
      <h4>제목 : {result?.title}</h4>
      <p>내용 : {result?.content}</p>
    </div>
  );
};

export default Detail;

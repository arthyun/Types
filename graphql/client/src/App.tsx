/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css';
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_DATA = gql`
  query Query($userId: Int) {
    books {
      title
      author
    }
    db {
      USER_NAME
      USER_DATE
      USER_ID
      SEQ
    }
    users(userId: $userId) {
      userId
      userName
      userEmail
    }
  }
`;

export default function App() {
  const [num, setNum] = useState<number>(1);

  const { loading, error, data } = useQuery(GET_DATA, { variables: { userId: num } });

  console.log(data);

  //로딩과 에러 설정
  if (loading) return <p className='loading'>Loading...</p>;
  if (error) return <p className='error'>Error 🔥</p>;

  return <div>{JSON.stringify(data)}</div>;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css';
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const num = 1;
const GET_DATA = gql`
  query Query {
    users(userId: ${num}) {
      userId
      userName
      userEmail
    }
  }
`;

export default function App() {
  // const [contentId, setContentId] = useState<string>('');
  // const { loading, error, data } = useQuery(GET_ROLES, { variables: { id: contentId } });
  const { loading, error, data } = useQuery(GET_DATA);
  console.log(data);

  //로딩과 에러 설정
  if (loading) return <p className='loading'>Loading...</p>;
  if (error) return <p className='error'>Error 🔥</p>;

  return <div>{JSON.stringify(data)}</div>;
}

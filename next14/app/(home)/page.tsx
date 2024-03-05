import { Metadata } from 'next';
import React, { useEffect, useState } from 'react';

export const metadata: Metadata = {
  title: 'Home'
};

const URL: string = process.env.NEXT_PUBLIC_API_URL ?? '';

const getMovies = async () => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const response = await fetch(URL);
  const json = await response.json();
  return json;
};

// 폴터명에 괄호를 씌어 생성하면 그룹화 하겠다는 의미이며, Route시 잡히지 않는다.
export default async function Home() {
  const movies = await getMovies();

  return <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>{JSON.stringify(movies)}</div>;
}

import { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import Movie from '@/components/Movie';
import styles from '@/styles/home.module.css';

/**
 * 사용할 URL들
 * /movies/:id
 * /movies/:id/credits
 * /movies/:id/videos
 * /movies/:id/providers
 * /movies/:id/similar
 */

export const metadata: Metadata = {
  title: 'Home'
};

export const URL: string = process.env.NEXT_PUBLIC_API_URL ?? '';

const getMovies = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 지정한 시간만큼 기다렸다가 다음 함수 호출 시킴
  const response = await fetch(URL);
  const json = await response.json();
  return json;
};

// 폴터명에 괄호를 씌어 생성하면 그룹화 하겠다는 의미이며, Route시 잡히지 않는다.
export default async function Home() {
  const movies = await getMovies();

  return (
    <div className={styles.container}>
      {movies?.map((movie: any, index: number) => {
        return <Movie key={movie.id} id={movie.id} title={movie.title} poster_path={movie.poster_path} />;
      })}
    </div>
  );
}

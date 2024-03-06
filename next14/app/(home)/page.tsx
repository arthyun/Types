import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

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
    <div>
      <ul className='list-disc pl-8'>
        {movies?.map((movie: any, index: number) => {
          return (
            <li key={index}>
              <Link href={`/movies/${movie.id}`} className='hover:font-bold hover:bg-red-400 block'>
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
      {/* 버튼 테스트 */}
      {/* <TestBtn id={movies[0].id} /> */}
    </div>
  );
}

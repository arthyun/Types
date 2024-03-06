import React, { Suspense } from 'react';
import { Metadata } from 'next';
import MovieVideos from '@/components/MovieVideos';
import MovieInfo from '@/components/MovieInfo';

export const metadata: Metadata = {
  title: `Movie Detail`
};

// SSR fetch시 항상 컴포넌트명 앞에 async/await를 붙여줘야함
export default function MovieDetail({ params: { id } }: { params: { id: string } }) {
  /* Suspense를 사용이유 : 로딩처리를 각기 분리하기 위함 (하나가 끝나면 먼저 보여줌) */
  return (
    <div>
      <h1>Movie Detail Page</h1>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <h3>Video</h3>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}

import React, { Suspense } from 'react';
import { Metadata } from 'next';
import MovieVideos from '@/components/MovieVideos';
import MovieInfo from '@/components/MovieInfo';
// import { URL } from '@/app/(home)/page';

export const metadata: Metadata = {
  title: `Movie Detail`
};

// const getMovie = async (id: string) => {
//   await new Promise((resolve) => setTimeout(resolve, 1000)); // 지정한 시간만큼 기다렸다가 다음 함수 호출 시킴
//   const response = await fetch(`${URL}/${id}`);
//   const json = await response.json();
//   return json;
// };

// const getVideos = async (id: string) => {
//   await new Promise((resolve) => setTimeout(resolve, 1000)); // 지정한 시간만큼 기다렸다가 다음 함수 호출 시킴
//   const response = await fetch(`${URL}/${id}/videos`);
//   const json = await response.json();
//   return json;
// };

// SSR fetch시 항상 컴포넌트명 앞에 async/await를 붙여줘야함
export default function MovieDetail({ params: { id } }: { params: { id: string } }) {
  // const movie = await getMovie(id);
  // const videos = await getVideos(id);

  // Promise.all은 결과값을 array형태로 반환하기 때문에 []로 변수들 지정해야함
  // 뒤에 then을 붙여 한번에 결과값을 확인해도되고 각 함수마다 error 코드를 작성해서 확인도 가능하다.
  // const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);

  /* Suspense를 이용하여 fetch를 두군대로 구분함 */
  return (
    <div>
      <h1>Movie Detail Page</h1>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}

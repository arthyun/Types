import React from 'react';
import { URL } from '@/app/(home)/page';

const getMovie = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 지정한 시간만큼 기다렸다가 다음 함수 호출 시킴
  const response = await fetch(`${URL}/${id}`);
  const json = await response.json();
  return json;
};

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);

  return (
    <h6>
      <strong>Title : </strong>
      {movie.title}
    </h6>
  );
}

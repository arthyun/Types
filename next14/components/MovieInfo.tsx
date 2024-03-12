import React from 'react';
import { URL } from '@/app/(home)/page';

const getMovie = async (id: string) => {
  const response = await fetch(`${URL}/${id}`);
  const json = await response.json();
  return json;
};

/* 내려받은 props를 이용하여 fetch */
export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);

  return (
    <h6>
      <strong>Title : </strong>
      {movie.title}
    </h6>
  );
}

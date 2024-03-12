import React from 'react';
import { URL } from '@/app/(home)/page';

const getVideos = async (id: string) => {
  const response = await fetch(`${URL}/${id}/videos`);
  const json = await response.json();
  return json;
};

/* 내려받은 props를 이용하여 fetch */
export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id);

  return (
    <h6>
      <strong>Video : </strong>
      {JSON.stringify(videos)}
    </h6>
  );
}

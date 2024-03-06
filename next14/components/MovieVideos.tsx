import React from 'react';
import { URL } from '@/app/(home)/page';

const getVideos = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 지정한 시간만큼 기다렸다가 다음 함수 호출 시킴
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

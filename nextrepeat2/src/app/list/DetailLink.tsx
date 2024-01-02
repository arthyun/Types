'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ObjectId } from 'mongodb';

const DetailLink = ({ id }: { id: string }) => {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push(`/detail/${id}`)}>
      상세페이지
    </button>
  );
};

export default DetailLink;

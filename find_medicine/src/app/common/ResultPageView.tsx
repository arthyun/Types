'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const ResultPageView = ({ limit, page }: { limit: number; page: number }) => {
  const router = useRouter();

  return (
    <div className="limitArea mb-2">
      <select
        value={limit}
        onChange={(e) => {
          router.replace(`/location?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&Q0=&Q1=&QT=1&QN=&ORD=NAME&pageNo=${page}&numOfRows=${e.target.value}`);
        }}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
      <span>개씩 보기</span>
    </div>
  );
};

export default ResultPageView;

'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createParam } from '../util/stringUtils';

interface iProps<T> {
  serviceKey?: string;
  Q0: string;
  Q1: string;
  QT: string;
  QN: string;
  ORD: string;
  page: T;
  limit?: T;
}

const ResultPageView = ({ serviceKey, Q0, Q1, QT, QN, ORD, page, limit }: iProps<number>) => {
  const [numOfRowsState, setNumOfRowsState] = useState<number>(10);

  const router = useRouter();

  let params: { serviceKey: string | undefined; Q0: string; Q1: string; QT: string; QN: string; ORD: string; pageNo: number; numOfRows?: number } = {
    serviceKey: process.env.NEXT_PUBLIC_API_KEY ?? serviceKey,
    Q0: Q0 ?? '', // 시/도
    Q1: Q1 ?? '', // 시/군/구
    QT: QT ?? '1', // 요일
    QN: QN ?? '', // 기관명
    ORD: ORD ?? 'NAME', // 순서
    pageNo: page ?? 1,
    numOfRows: limit ?? 10
  };

  useEffect(() => {
    if (params.numOfRows !== numOfRowsState) {
      params.numOfRows = numOfRowsState;
      router.push(`/location?${createParam(params)}`);
    }
  }, [numOfRowsState]);

  return (
    <div className='limitArea mb-2'>
      <select
        value={numOfRowsState}
        onChange={(e) => {
          setNumOfRowsState(() => Number(e.target.value));
        }}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select>
      <span> 개씩 보기</span>
    </div>
  );
};

export default ResultPageView;

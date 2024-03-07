// 'use client';
import React from 'react';
import LocationHeader from './components/LocationHeader';
// import { useSearchParams } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  // const params = useSearchParams();
  // const serviceKey = params.get('serviceKey') ?? '';
  // const Q0 = params.get('Q0') ?? '';
  // const Q1 = params.get('Q1') ?? '';
  // const QT = params.get('QT') ?? '';
  // const QN = params.get('QN') ?? '';
  // const ORD = params.get('ORD') ?? '';
  // const pageNo = params.get('pageNo') ?? 1;
  // const numOfRows = params.get('numOfRows') ?? 10;

  return (
    <div>
      <LocationHeader
      // serviceKey={serviceKey} Q0={Q0} Q1={Q1} QT={QT} QN={QN} ORD={ORD} pageNo={pageNo} numOfRows={numOfRows}
      />
      {children}
    </div>
  );
}

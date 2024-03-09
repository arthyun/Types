// 'use client';
import React from 'react';
import LocationHeader from './components/LocationHeader';
// import { useSearchParams } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <LocationHeader />
      {children}
    </div>
  );
}

'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ConfirmAccess = () => {
  const router = useRouter();

  useEffect(() => {
    const data = sessionStorage?.getItem('visit');
    if (data === null) {
      router.push('/');
    } else {
      router.push('/location');
    }
  }, []);

  return <></>;
};

export default ConfirmAccess;

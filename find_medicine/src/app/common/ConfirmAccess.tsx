'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ConfirmAccess = () => {
  const router = useRouter();

  useEffect(() => {
    const data = sessionStorage?.getItem('visit');
    if (data === null) {
      router.push('/access');
    } else {
      router.push('/');
    }
  }, []);

  return <></>;
};

export default ConfirmAccess;

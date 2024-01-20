'use client';

import React, { useEffect } from 'react';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';

const Access = async () => {
  const router = useRouter();

  const routingHome = () => {
    router.push('/');
  };

  const setStorage = () => {
    sessionStorage.setItem('visit', JSON.stringify(true));
    const header = document.querySelector('#headerArea') as HTMLHeadElement;
    header.style.display = 'block';
    routingHome();
  };

  useEffect(() => {
    if (sessionStorage.getItem('visit')) {
      sessionStorage.clear();
    }
    if (document.querySelector('#headerArea') !== null) {
      const header = document.querySelector('#headerArea') as HTMLHeadElement;
      header.style.display = 'none';
    }
  }, []);

  return (
    <div>
      어서오세요 OOO입니다.
      <Button type="button" onFunc={setStorage} buttonName="들어가기" />
    </div>
  );
};

export default Access;

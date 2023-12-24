'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, []);

  return (
    <div>
      <h4 className="title">찾을 수 없는 페이지 입니다.</h4>
    </div>
  );
};

export default NotFound;

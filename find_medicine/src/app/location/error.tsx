'use client';
import React, { useEffect } from 'react';

export default function error() {
  useEffect(() => {
    window.location.replace('/location');
  }, []);

  return <h2>에러가 발생하였습니다. 돌아가세요.</h2>;
}

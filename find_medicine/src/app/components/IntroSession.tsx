'use client';
import React, { useEffect } from 'react';

const IntroSession = () => {
  useEffect(() => {
    if (sessionStorage.getItem('visit')) {
      sessionStorage.clear();
    }
  }, []);

  return <></>;
};

export default IntroSession;

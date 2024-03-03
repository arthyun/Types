'use client';
import React, { useEffect } from 'react';

const IntroSession = () => {
   useEffect(() => {
      if (sessionStorage.getItem('visit')) {
         sessionStorage.clear();
      }
      if (document.querySelector('#headerArea') !== null) {
         // const header = document.querySelector('#headerArea') as HTMLHeadElement;
         // header.style.display = 'none';
      }
   }, []);

   return <></>;
};

export default IntroSession;

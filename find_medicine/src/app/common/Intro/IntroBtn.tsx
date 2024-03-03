'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const IntroBtn = () => {
   const router = useRouter();

   const routingHome = () => {
      router.push(`/location?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&Q0=&Q1=&QT=1&QN=&ORD=NAME&pageNo=1&numOfRows=10`);
   };

   const setStorage = (e: any) => {
      e.preventDefault();
      sessionStorage.setItem('visit', JSON.stringify(true));
      // const header = document.querySelector('#headerArea') as HTMLHeadElement;
      // header.style.display = 'block';
      routingHome();
   };

   // 창닫기 함수
   const WinClose = () => {
      window.open('about:blank', '_self').close();
      return false;
   };

   return (
      <>
         <Link
            href="/#"
            className="w-1/2 bg-green-400 px-4 py-2 block text-white font-bold rounded-md transition-all hover:animate-bounce"
            onClick={setStorage}
         >
            입장
         </Link>
         <Link
            href="/#"
            className="w-1/2 bg-gray-300 px-4 py-2 block font-bold rounded-md transition-all hover:animate-bounce"
            onClick={(e) => {
               e.preventDefault();
               WinClose();
            }}
         >
            닫기
         </Link>
      </>
   );
};

export default IntroBtn;

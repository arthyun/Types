'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import Link from 'next/link';
import Image from 'next/image';
import backGroundImage from '/public/pharmacy.jpg';

const Intro = () => {
  const router = useRouter();

  const routingHome = () => {
    router.push('/location');
  };

  const setStorage = (e: any) => {
    e.preventDefault();
    sessionStorage.setItem('visit', JSON.stringify(true));
    // const header = document.querySelector('#headerArea') as HTMLHeadElement;
    // header.style.display = 'block';
    routingHome();
  };

  useEffect(() => {
    if (sessionStorage.getItem('visit')) {
      sessionStorage.clear();
    }
    if (document.querySelector('#headerArea') !== null) {
      // const header = document.querySelector('#headerArea') as HTMLHeadElement;
      // header.style.display = 'none';
    }
  }, []);

  // 창닫기 함수
  const WinClose = () => {
    window.open('about:blank', '_self').close();
    return false;
  };

  return (
    <div className="w-full h-[100vh]">
      <Image src={backGroundImage} alt="bg" layout="fill" objectFit="cover" objectPosition="center" />
      <div className="min-w-[500px] absolute top-[50%] left-[50%] z-20 translate-x-[-50%] translate-y-[-50%] px-16 py-14 rounded-xl box-border bg-white shadow-xl">
        <h3 className="text-lg font-bold">어서오세요 약국을 찾아드리는 서비스입니다.</h3>
        <p className="text-md my-2">간편하게 입력하여 원하는 장소의 약국을 찾아보세요.</p>
        <p className="text-md my-2">도움이 되시길 바랍니다. 감사합니다.</p>
        <span className="block text-sm text-blue-400 my-4">→ 해당 서비스는 상업용이 아님을 밝힙니다.</span>
        <div className="btn-wrap flex gap-1 mt-6 text-center">
          <Link href="/#" className="w-1/2 bg-green-400 px-4 py-2 block text-white font-bold rounded-md transition-all hover:animate-bounce" onClick={setStorage}>
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
          {/* <Button type="button" onFunc={setStorage} buttonName="들어가기" /> */}
        </div>
      </div>
    </div>
  );
};

export default Intro;

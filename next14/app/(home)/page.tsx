import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Home'
};

// 폴터명에 괄호를 씌어 생성하면 그룹화 하겠다는 의미이며, Route시 잡히지 않는다.
export default function Home() {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <h1>Hello World!</h1>
    </div>
  );
}

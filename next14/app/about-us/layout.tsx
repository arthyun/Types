import React from 'react';

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>나는 어바웃 레이아웃입니다.</h1>
      {children}
    </div>
  );
}

import React from 'react';

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>I am About Layout</h1>
      {children}
    </div>
  );
}

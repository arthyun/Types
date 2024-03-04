import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'AboutUs'
};

export default function AboutUs() {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <h3>About Us!</h3>
    </div>
  );
}

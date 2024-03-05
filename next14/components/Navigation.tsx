'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className='flex gap-4 border-b-2 px-2 py-2 box-border'>
        <li>
          <Link href='/'>Home</Link>
          {pathname === '/' ? ' VVV' : ''}
        </li>
        <li>
          <Link href='/about-us'>About Us</Link>
          {pathname === '/about-us' ? ' VVV' : ''}
        </li>
      </ul>
    </nav>
  );
}

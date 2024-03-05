'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className='border-b-2 mb-4'>
      <ul className='flex gap-2 p-2'>
        <li>
          <Link href='/'>Home</Link>
          {pathname === '/' ? ' 💥' : ''}
        </li>
        <li>
          <Link href='/about-us'>About Us</Link>
          {pathname === '/about-us' ? ' 💥' : ''}
        </li>
      </ul>
    </nav>
  );
}

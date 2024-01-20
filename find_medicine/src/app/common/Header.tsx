import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header id="headerArea" className="px-3 py-3 bg-green-400 box-border">
      <nav>
        <ul className="flex justify-between">
          <li className="w-[75%]">
            <Link href="/">Logo(Home)</Link>
          </li>
          <li className="w-auto">
            <Link href="/location">Location</Link>
          </li>
          <li className="w-auto">
            <Link href="/info">Info</Link>
          </li>
          <li className="w-auto">
            <Link href="/notice">Notice</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

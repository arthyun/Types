import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '애플후레시',
  description: 'Generated by create next app',
  icons: {
    icon: '/favicon.ico'
  }
};

type NodeType = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: NodeType) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar">
          <Link href="/">Home</Link>
          <Link href="/list">List</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
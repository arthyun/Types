import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import ConfirmAccess from './common/ConfirmAccess';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pharmacy',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='wrap'>
          {/* 전체 로딩 인터셉트 처리 */}
          <ConfirmAccess />
          <main className='w-full box-border'>{children}</main>
        </div>
        <Script strategy='beforeInteractive' src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}`} />
      </body>
    </html>
  );
}

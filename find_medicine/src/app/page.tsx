import Image from 'next/image';
import Link from 'next/link';
import backGroundImage from '/public/pharmacy.jpg';
// import IntroSession from './components/IntroSession';
import { executePool } from './util/database';

// font-awesome
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

// Components
export default async function Home() {
  const sql = 'select * from user_info'; // 쿼리문
  // const dbData = await executePool(sql, '');
  // console.log(dbData);

  return (
    <div className='w-[75%] min-w-[480px] m-auto py-10'>
      {/* MainArea */}
      <div className='w-full'>
        {/* <IntroSession /> */}
        <Image src={backGroundImage} alt='bg' layout='fill' objectFit='cover' objectPosition='center' />
        <div className='min-w-[500px] absolute top-[50%] left-[50%] z-20 translate-x-[-50%] translate-y-[-50%] px-16 py-14 rounded-xl box-border bg-white shadow-xl'>
          <h3 className='text-lg font-bold'>어서오세요 약국을 찾아드리는 서비스입니다.</h3>
          <p className='text-md my-2'>간편하게 입력하여 원하는 장소의 약국을 찾아보세요.</p>
          <p className='text-md my-2'>도움이 되시길 바랍니다. 감사합니다.</p>
          <span className='block text-sm text-blue-400 my-4'>→ 해당 서비스는 상업용이 아님을 밝힙니다.</span>
          <div className='btn-wrap flex gap-1 mt-6 text-center'>
            <Link href='/location' className='w-1/2 bg-green-400 px-4 py-2 block text-white font-bold rounded-md transition-all hover:animate-bounce'>
              입장
            </Link>
            <Link href='/#' className='w-1/2 bg-gray-300 px-4 py-2 block font-bold rounded-md transition-all hover:animate-bounce'>
              닫기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

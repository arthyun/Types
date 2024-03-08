/* eslint-disable */
'use client';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createParam } from '../util/stringUtils';
import Link from 'next/link';

// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

interface iProps<T> {
  serviceKey?: string;
  Q0: string;
  Q1: string;
  QT: string;
  QN: string;
  ORD: string;
  page: T;
  limit?: T;
  totalcnt: any | number | bigint;
  totalpage?: any | number | bigint;
}

const ResultListPaging = ({ serviceKey, Q0, Q1, QT, QN, ORD, page, limit, totalcnt }: iProps<number>) => {
  const router = useRouter();

  const params: { serviceKey: string | undefined; Q0: string; Q1: string; QT: string; QN: string; ORD: string; pageNo?: number; numOfRows?: number } = {
    serviceKey: process.env.NEXT_PUBLIC_API_KEY ?? serviceKey,
    Q0: Q0 ?? '', // 시/도
    Q1: Q1 ?? '', // 시/군/구
    QT: QT ?? '1', // 요일
    QN: QN ?? '', // 기관명
    ORD: ORD ?? 'NAME', // 순서
    numOfRows: limit ?? 10
  };

  const changePage = (e: any, num: number) => {
    e.preventDefault();
    params.pageNo = num;
    router.push(`/location?${createParam(params)}`);
  };

  // 10개씩 보여주기
  // 현재 페이지 22개일 때 firstPage 2 * 10
  // page : 현재페이지
  // totalpage: 전체페이지
  // totalcnt : 전체 row 수
  // limit : 현재 보여주는 row count 수
  // 현재페이지가 10 단위인 경우 : 10
  let totalpage = 0;
  if (limit && totalcnt) {
    totalpage = Math.ceil(totalcnt / limit);
  }

  // 페이지 배열 생성
  const pageArray = useMemo(() => {
    if (totalpage && page) {
      // startpage : 현재 페이지 기반으로 페이지네이션 시작하는 페이지 (예: 현재 4페이지라면 startpage는 1, 현재 56페이지라면 startpage는 51)
      const startpage = Math.floor((page - 1) / 10) * 10 + 1;
      // <startpage부터 마지막 페이지까지 남은 갯수>와 <10개> 중 작은 수만큼 길이로 현재 페이지부터 순차 배열 생성
      return new Array(Math.min(totalpage - startpage + 1, 10)).fill(null).map((n, i) => i + startpage);
    } else return [];
  }, [totalpage, page]);

  return (
    <div className='pagination'>
      {page !== 1 && (
        <>
          {/* 맨앞 페이지로 */}
          <Link href='/#' onClick={(e) => changePage(e, 1)} className='mr-2' aria-disabled>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </Link>
          {/* 이전 페이지로 */}
          <Link href='/#' onClick={(e) => changePage(e, page - 1)} className='mr-2' aria-disabled>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
        </>
      )}
      {/* 클릭한 페이지로 */}
      {pageArray.map((item, i) =>
        item === page ? (
          <strong key={item} aria-current='page' className='px-1.5 py-1 rounded-md bg-[#29F2A9] mx-1 text-[#1E4DD9]'>
            {item}
          </strong>
        ) : (
          <Link href='/#' onClick={(e) => changePage(e, item)} key={`pagination_${i}`} className='mx-1'>
            {item}
          </Link>
        )
      )}
      {page < totalpage && (
        <>
          {/* 다음 페이지로 */}
          <Link href='/#' onClick={(e) => changePage(e, page + 1)} className='mr-2' aria-disabled>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
          {/* 마지막 페이지로 */}
          <Link href='/#' onClick={(e) => changePage(e, totalpage)} className='mr-2' aria-disabled>
            <FontAwesomeIcon icon={faAnglesRight} />
          </Link>
        </>
      )}
    </div>
  );
};

export default ResultListPaging;

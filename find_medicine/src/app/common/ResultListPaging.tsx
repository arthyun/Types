/* eslint-disable */
import Link from 'next/link';
import { useMemo } from 'react';

interface iProps<T> {
  limit: T;
  page: T;
  totalpage: any | number | bigint;
  totalcnt: any | number | bigint;
  setPageCnt: React.Dispatch<React.SetStateAction<T>>;
}

const ResultListPaging = ({ limit, page, totalpage, totalcnt, setPageCnt }: iProps<number>) => {
  // 10개씩 보여주기
  // 현재 페이지 22개일 때 firstPage 2 * 10
  // page : 현재페이지
  // totalpage: 전체페이지
  // totalcnt : 전체 row 수
  // limit : 현재 보여주는 row count 수
  // 현재페이지가 10 단위인 경우 : 10
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
    <div className="pagination">
      {page !== 1 && (
        <>
          <Link href="" onClick={() => setPageCnt(1)} className="first" aria-disabled>
            처음 페이지
          </Link>
          <Link href="" onClick={() => setPageCnt(page - 1)} className="prev" aria-disabled>
            이전 페이지
          </Link>
        </>
      )}
      {pageArray.map((item, i) =>
        item === page ? (
          <strong key={item} aria-current="page">
            {item}
          </strong>
        ) : (
          <Link href="" onClick={() => setPageCnt(item)} key={`pagination_${item}`}>
            {item}
          </Link>
        )
      )}
      {page < totalpage && (
        <>
          <Link href="" onClick={() => setPageCnt(page + 1)} className="next" aria-disabled>
            다음 페이지
          </Link>
          <Link href="" onClick={() => setPageCnt(totalpage)} className="last" aria-disabled>
            마지막 페이지
          </Link>
        </>
      )}
    </div>
  );
};

export default ResultListPaging;

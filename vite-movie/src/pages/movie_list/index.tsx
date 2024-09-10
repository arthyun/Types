/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useRef, useState } from 'react';
import axiosHttpClient from '@/api/axiosHttpClient.ts';
import { movieStore } from '@/contexts/movieStore.ts';
import { userStore } from '@/contexts/userStore';
import { MovieListTypes, PaginationTypes } from './types';
import MovieList from './components/MovieList';

const MovieListWrap = () => {
  // States
  const searchQuery = movieStore((state: { query: string }) => state.query);
  const setQuery = movieStore(
    (state: { setQuery: (by: string) => void }) => state.setQuery
  );
  const info = userStore((state: { info: boolean }) => state.info);
  const [movieList, setMovieList] = useState<MovieListTypes[]>([]);
  const movieListArticleRef = useRef<HTMLElement>(null);

  // Pagination States
  const [paginationData, setPaginationData] = useState<PaginationTypes>({
    page: 1,
    total_pages: 0,
    total_results: 0,
  });

  // Apis
  const getList = async () => {
    const params = {
      query: searchQuery,
      include_adult: false,
      language: 'ko-KR',
      page: paginationData.page,
    };

    try {
      const res = await axiosHttpClient.get(`/3/search/movie`, { params });
      if (res.results.length !== 0) {
        setPaginationData({
          page: res.page,
          total_pages: res.total_pages,
          total_results: res.total_results,
        });
        setMovieList(res.results);
      }
    } catch (error) {
      alert('영화 데이터가 없습니다.', 'error'); // 기존 alert와 겹쳐서 오류 띄우는중임 문제는 없음
    }
  };

  // Side Effects
  useEffect(() => {
    getList(); // 조회

    // storage에 info 데이터가 없으면 홈으로 되돌리기
    if (!info) {
      window.location.replace('/');
    }
  }, [paginationData.page]);

  // 페이지 번호 변경시마다 검색어를 초기화하면 재호출이 안돼어 별도로 뺌
  useEffect(() => {
    return () => setQuery('');
  }, []);

  // 재 호출로 인하여 렌더링시 스크롤 상단으로
  useMemo(() => {
    if (movieList.length > 0) {
      movieListArticleRef.current!.scrollTop = 0;
    }
  }, [movieList]);

  return (
    <>
      <MovieList
        movieList={movieList}
        paginationData={paginationData}
        setPaginationData={setPaginationData}
        movieListArticleRef={movieListArticleRef}
      />
    </>
  );
};

export default MovieListWrap;

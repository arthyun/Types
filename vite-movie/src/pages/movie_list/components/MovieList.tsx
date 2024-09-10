import classes from '@/pages/movie_list/styles/movielist.module.scss';
import { Dispatch, FC, Ref, SetStateAction } from 'react';
import { MovieListTypes, PaginationTypes } from '../types';
import useModal from '@/hooks/useModal';
import Pagination from '@/common/components/Pagination';
import NoMovieView from './NoMovieView';

interface IProps {
  movieList: MovieListTypes[];
  paginationData: PaginationTypes;
  setPaginationData: Dispatch<SetStateAction<PaginationTypes>>;
  movieListArticleRef: Ref<HTMLElement>;
}

const MovieList: FC<IProps> = ({
  movieList,
  paginationData,
  setPaginationData,
  movieListArticleRef,
}) => {
  // Modal Handler
  const { ModalHandler } = useModal();

  // 줄거리 자르기
  const handleOverviewCut = (overview: string | undefined): string => {
    let resultOverView = '';
    if (overview !== undefined) {
      //   if (overview.length > 150) {
      resultOverView = overview.slice(0, 150) + '...';
      //   }
    }
    return resultOverView;
  };

  // 클릭시 상세 호출
  const handleMovieDetail = (selectedItem: MovieListTypes) => {
    ModalHandler(<ModalTestComponent />, 'open', { id: selectedItem.id });
  };

  // `https://www.themoviedb.org/video/play?key=${key}&width=${width}&height=${height}&_=${id}` // 트레일러 사용 주소

  return (
    <>
      <section className={classes.movie_list}>
        <h1>
          영화 검색 결과 <span>({paginationData.total_results} 개)</span>
        </h1>
        <article ref={movieListArticleRef}>
          {movieList.length > 0 ? (
            <ul>
              {movieList.map((movie) => {
                return (
                  <li key={movie.id} onClick={() => handleMovieDetail(movie)}>
                    <img
                      src={import.meta.env.VITE_POSTER_PATH + movie.poster_path}
                      alt={movie.original_title}
                    />
                    <dl>
                      <dt>
                        <span>제목:</span>
                        {movie.title}
                      </dt>
                      <dd className={classes.movie_overview}>
                        <span>줄거리:</span>
                        {handleOverviewCut(movie.overview)}
                      </dd>
                      <dd>
                        <span>나이제한:</span>
                        {movie.adult ? '19세 이상' : '전 연령'}
                      </dd>
                      <dd>
                        <span>개봉일:</span>
                        {movie.release_date !== ''
                          ? movie.release_date
                          : '정보 없음'}
                      </dd>
                      <dd>
                        <span>평점:</span>
                        {movie.vote_average}
                      </dd>
                    </dl>
                  </li>
                );
              })}
            </ul>
          ) : (
            <NoMovieView />
          )}
        </article>
        <Pagination
          //   totalItems={paginationData.total_results}
          //   itemsPerPage={10}
          totalPages={paginationData.total_pages}
          currentPage={paginationData.page}
          onPageChange={(page: number) =>
            setPaginationData({
              ...paginationData,
              page: page,
            })
          }
        />
      </section>
      <div className={classes.movie_overlay}></div>
    </>
  );
};

export default MovieList;

///////////////////////////
const ModalTestComponent = () => {
  return (
    <>
      <h1>모달 작업중...~</h1>
    </>
  );
};

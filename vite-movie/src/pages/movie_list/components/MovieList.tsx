import classes from '@/pages/movie_list/styles/movielist.module.scss';
import { Dispatch, FC, Ref, SetStateAction } from 'react';
import { MovieListTypes, PaginationTypes } from '../types';
import useModal from '@/hooks/useModal';
import Pagination from '@/common/components/Pagination';
import noDataImage from '@/assets/images/no_data_image.jpeg';
import NoMovieView from './NoMovieView';
import MovieModal from './MovieModal';

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

  // 클릭시 상세 호출
  const handleMovieDetail = (selectedItem: MovieListTypes) => {
    ModalHandler(
      <MovieModal id={selectedItem.id} overview={selectedItem.overview} />,
      'open'
    );
  };

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
                      src={
                        movie.poster_path !== null
                          ? import.meta.env.VITE_POSTER_PATH + movie.poster_path
                          : noDataImage
                      }
                      alt={movie.original_title}
                    />
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

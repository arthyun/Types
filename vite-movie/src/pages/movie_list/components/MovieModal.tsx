import classes from '@/pages/modals/styles/modal.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { MovieDetailTypes, MovieLinkTypes } from '../types';
import axiosHttpClient from '@/api/axiosHttpClient';
import noDataImage from '@/assets/images/no_data_image.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faClapperboard,
  faFilm,
  faMessage,
  faStarHalfStroke,
  faStopwatch,
  faTag,
  faUserLock,
  faVideo,
  faVideoSlash,
} from '@fortawesome/free-solid-svg-icons';

const MovieModal = ({ id, overview }: { id: number; overview: string }) => {
  const [movieDetail, setMovieDetail] = useState<MovieDetailTypes | undefined>(
    undefined
  );
  const [movieLink, setMovieLink] = useState<MovieLinkTypes | undefined>(
    undefined
  );
  const [movieRunTime, setMovieRunTime] = useState<{
    hour: number;
    minute: number;
  }>({
    hour: 0,
    minute: 0,
  });

  // 줄거리 자르기
  const handleOverviewCut = (overview: string | undefined): string => {
    let resultOverView = '';
    if (overview !== undefined) {
      resultOverView = overview.slice(0, 300);
      if (overview.length > resultOverView.length) {
        resultOverView += '...';
      }
    }
    return resultOverView;
  };

  // Apis
  const getDetail = async (id: number) => {
    const params = {
      append_to_response: '',
      language: 'ko-KR',
    };
    try {
      const res = (await axiosHttpClient.get(`/3/movie/${id}`, {
        params,
      })) as any;
      const resMov = (await axiosHttpClient.get(
        `/3/movie/${id}/videos?language=en-EN`
      )) as any;
      // 상세 정보
      if (res) {
        setMovieDetail(res);
      }
      // 비디오 링크 정보
      if (resMov.results.length > 0) {
        setMovieLink(resMov.results[0]);
      }
    } catch (error) {
      // @ts-ignore
      alert('불러올 데이터가 없습니다.', 'error'); // 기존 alert와 겹쳐서 오류 띄우는중임 문제는 없음
    }
  };

  useEffect(() => {
    getDetail(id);
  }, []);

  useMemo(() => {
    if (movieDetail !== undefined && movieDetail.runtime > 60) {
      setMovieRunTime({
        hour: Math.floor(movieDetail?.runtime / 60),
        minute: movieDetail?.runtime % 60,
      });
    } else {
      if (movieDetail !== undefined) {
        setMovieRunTime({
          ...movieRunTime,
          minute: movieDetail.runtime,
        });
      }
    }
  }, [movieDetail]);

  //   console.log(movieDetail);
  // console.log(movieLink);
  //   console.log(movieRunTime);

  return (
    <>
      {movieDetail !== undefined ? (
        <dl className={classes.modal_content}>
          <div className={classes.modal_first_box}>
            <img
              src={
                movieDetail.poster_path !== null
                  ? import.meta.env.VITE_POSTER_PATH + movieDetail.poster_path
                  : noDataImage
              }
              alt={movieDetail.original_title}
            />
          </div>
          <div className={classes.modal_second_box}>
            <dt>
              <span>
                <FontAwesomeIcon icon={faClapperboard} />
              </span>
              {movieDetail.title}
            </dt>
            <dd>
              {/* 줄거리 데이터는 부모로 부터 받음 */}
              <span>
                <FontAwesomeIcon icon={faMessage} />
              </span>
              {overview !== '' ? handleOverviewCut(overview) : '정보 없음'}
            </dd>
            <dd>
              <span>
                <FontAwesomeIcon icon={faFilm} />
              </span>
              {movieDetail.release_date !== ''
                ? `${movieDetail.release_date.split('-')[0]}년 ${
                    movieDetail.release_date.split('-')[1]
                  }월 ${movieDetail.release_date.split('-')[2]}일`
                : '정보 없음'}
            </dd>
            <dd>
              <span>
                <FontAwesomeIcon icon={faStopwatch} />
              </span>
              {movieRunTime.hour !== 0
                ? `${movieRunTime.hour}시간 ${movieRunTime.minute}분`
                : `${movieRunTime.minute}분`}
            </dd>
            <dd>
              <span>
                <FontAwesomeIcon icon={faStarHalfStroke} />
              </span>
              {movieDetail.vote_average}
            </dd>
            <dd>
              <span>
                <FontAwesomeIcon icon={faUserLock} />
              </span>
              {movieDetail.adult ? '19세 이상' : '전 연령'}
            </dd>
            <dd>
              <span>
                <FontAwesomeIcon icon={faBuilding} />
              </span>
              {movieDetail.production_companies.length > 0
                ? movieDetail.production_companies.map((company) => {
                    return (
                      <p key={company.id}>
                        {/* {company.logo_path !== '' && (
                          <img
                            src={
                              import.meta.env.VITE_POSTER_PATH +
                              company.logo_path
                            }
                            alt={`company${company.id}_logo`}
                          />
                        )} */}
                        {company.name}
                      </p>
                    );
                  })
                : '정보 없음'}
            </dd>
            <dd>
              <span>
                <FontAwesomeIcon icon={faTag} />
              </span>
              {movieDetail.genres.length > 0
                ? movieDetail.genres.map((tag) => {
                    return <p key={tag.id}>{tag.name}</p>;
                  })
                : '정보 없음'}
            </dd>
            <dd>
              {movieLink !== undefined ? (
                <a
                  href={`https://www.themoviedb.org/video/play?key=${movieLink.key}&width=1680&height=1080&_=${movieLink.id}`}
                  target='_blank'
                >
                  <FontAwesomeIcon icon={faVideo} />
                </a>
              ) : (
                <a>
                  <FontAwesomeIcon icon={faVideoSlash} />
                </a>
              )}
            </dd>
          </div>
        </dl>
      ) : null}
    </>
  );
};

export default MovieModal;

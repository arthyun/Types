import classes from '@/pages/movie_list/styles/movielist.module.scss';
import { useNavigate } from 'react-router-dom';

const NoMovieView = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/', { replace: false });
  };

  return (
    <div className={classes.no_movie_view}>
      <h3>검색 결과가 없습니다.</h3>
      <p>다시 검색을 위하여 아래 돌아가기 버튼을 눌러주세요.</p>
      <button type='button' onClick={handleReturn}>
        돌아가기
      </button>
    </div>
  );
};

export default NoMovieView;

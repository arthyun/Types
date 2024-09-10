import classes from '@/assets/styles/common.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { userStore } from '@/contexts/userStore';

const Header = () => {
  // Another
  const navigate = useNavigate();
  // States
  const setInfo = userStore(
    (state: { setInfo: (by: boolean) => void }) => state.setInfo
  );

  const handleReturn = () => {
    setInfo(false); // 전역 처리 후 헤더 및 푸터 안보이게
    navigate('/', { replace: false });
  };

  return (
    <header className={classes.header} onClick={handleReturn}>
      <FontAwesomeIcon icon={faHouse} />
    </header>
  );
};

export default Header;

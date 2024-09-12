import classes from '@/assets/styles/common.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { userStore } from '@/contexts/userStore';
import { useEffect, useState } from 'react';

const Header = () => {
  // Another
  const navigate = useNavigate();
  // States
  const setInfo = userStore(
    (state: { setInfo: (by: boolean) => void }) => state.setInfo
  );
  const [isOpenTooltip, setIsOpenTooltip] = useState<boolean>(false);

  const handleMenuBtn = (e: any) => {
    e.stopPropagation();
    setIsOpenTooltip(!isOpenTooltip);
  };

  const handleGoHome = () => {
    setInfo(false); // 전역 처리 후 헤더 및 푸터 안보이게
    navigate('/', { replace: false });
  };

  useEffect(() => {
    document.addEventListener('click', () => setIsOpenTooltip(false));
    // return () => document.removeEventListener('click');
  }, []);

  return (
    <header
      className={classes.header}
      onMouseEnter={() => setIsOpenTooltip(true)}
      onMouseLeave={() => setIsOpenTooltip(false)}
    >
      <FontAwesomeIcon icon={faHouse} onClick={handleMenuBtn} />

      {isOpenTooltip && (
        <div className={classes.tooltop}>
          <span onClick={handleGoHome}>Home</span>
          <span>Menu02</span>
          <span>Menu03</span>
        </div>
      )}
    </header>
  );
};

export default Header;

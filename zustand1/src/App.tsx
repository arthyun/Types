/* eslint-disable */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppRouter from './Router';
import { userInfoStore } from './components/SignIn';

// Components
const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { userConfirm } = userInfoStore();

  useEffect(() => {
    if (!userConfirm) {
      console.log('로그인이 필요하다');
      navigate('/signin', { replace: true });
    } else {
      console.log('로그인 되어있다');
      navigate('/', { replace: true });
    }
  }, [userConfirm]);

  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;

/* eslint-disable */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRouter from './Router';
import { userInfoStore } from './components/SignIn';

// Components
const App = () => {
  const navigate = useNavigate();

  const { userConfirm } = userInfoStore();

  useEffect(() => {
    if (!userConfirm) {
      navigate('/signin', { replace: true });
    } else {
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

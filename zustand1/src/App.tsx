/* eslint-disable */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRouter from './Router';

// Components
const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/signin', { replace: true });
  }, []);

  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;

import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();

  const changeLocation = (url: string, option: { replace: boolean }) => {
    navigate(url, option);
  };

  return (url = '/', option = { replace: false }) =>
    changeLocation(url, option);
};

export default useNavigation;

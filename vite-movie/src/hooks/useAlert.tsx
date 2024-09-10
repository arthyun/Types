import { toast } from 'react-toastify';

const useAlert = () => {
  const alert = (text: string, type: string) => {
    switch (type) {
      case 'success':
        toast.success(text);
        break;
      case 'info':
        toast.info(text, { icon: false });
        break;
      default:
        toast.error(text);
        break;
    }
  };

  return (text = '알 수 없는 에러 발생', type = 'error') => alert(text, type);
};

export default useAlert;

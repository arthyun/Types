import { useEffect } from 'react';
import axiosHttpClient from '@/api/axiosHttpClient.ts';
import classes from '@/assets/styles/common.module.scss';
import Router from './Router.tsx';
import useAlert from '@/hooks/useAlert';
import ModalComponent from '@/pages/modals/ModalComponent';
import LoadingSplash from '@/common/components/Loading/LoadingSplash';
import { loadingStore } from '@/contexts/loadingStore.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  // 공통 기능 window 객체에 추가
  window.alert = useAlert();

  // Zustand
  const isLoading = loadingStore(
    (state: { isLoading: any }) => state.isLoading
  );
  const setIsLoading = loadingStore(
    (state: { setIsLoading: (by: boolean) => void }) => state.setIsLoading
  );

  useEffect(() => {
    axiosHttpClient.interceptors.request.use(
      (config: any) => {
        // if (config.url.includes('/api/')) setIsLoading(true);
        setIsLoading(true);
        return config;
      },
      (error: any) => {
        // 에러 팝업 혹은 콘솔 표출
        return Promise.reject(error);
      }
    );
    axiosHttpClient.interceptors.response.use(
      (response: any) => {
        setIsLoading(false);
        return response;
      },
      (error: any) => {
        setIsLoading(false);
        if (
          error.response?.status === 401 ||
          error.response.data?.status === '401'
        ) {
          // setIsLogin(userInfo ? false : undefined);
        }
        // 에러 팝업 혹은 콘솔 표출
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <main className={classes.main}>
      <Router />

      {/* Alert 처리 */}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />

      {/* Modal 처리 */}
      <ModalComponent />

      {/* Loading 처리 */}
      {isLoading && <LoadingSplash />}
    </main>
  );
}

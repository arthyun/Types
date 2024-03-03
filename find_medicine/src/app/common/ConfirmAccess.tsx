'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios, { InternalAxiosRequestConfig } from 'axios';
import LoadingSplash from './LoadingSplash';

const ConfirmAccess = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!sessionStorage.getItem('visit')) {
      router.push('/');
    }

    // request intercept
    axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig<string | undefined>) => {
        if (config?.url?.includes('data')) setIsLoading(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // response intercept
    axios.interceptors.response.use(
      (response) => {
        setIsLoading(false);
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  return <>{isLoading && <LoadingSplash />}</>;
};

export default ConfirmAccess;

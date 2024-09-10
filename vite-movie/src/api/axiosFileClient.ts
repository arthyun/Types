import axios, { Axios } from 'axios';
import { getCookie } from '@/utils/cookie.ts';

const axiosFileClient = new Axios({
  baseURL: '',
  responseType: 'json',
  transformRequest: axios.defaults.transformRequest,
});

axiosFileClient.interceptors.request.use(
  (config) => {
    if (config.method!.toUpperCase() !== 'GET') {
      if (getCookie('token')) {
        config.headers.Authorization = `Bearer ${getCookie('token')}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosFileClient.interceptors.response.use(
  async (response) => {
    if (response.data) {
      const res = JSON.parse(response.data);
      return res;
    } else {
      return response.statusText;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosFileClient;

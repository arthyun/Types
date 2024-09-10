import axios, { Axios } from 'axios';
import { getCookie } from '@/utils/cookie.ts';

const axiosHttpClient = new Axios({
  baseURL: `${import.meta.env.VITE_MOVIE_SEARCH}`,
  responseType: 'json',
  transformRequest: axios.defaults.transformRequest,
});

axiosHttpClient.interceptors.request.use(
  (config) => {
    if (
      config.method!.toUpperCase() === 'GET' ||
      config.method!.toUpperCase() === 'DELETE'
    ) {
      config.headers.clear();
      //   config.headers.setAuthorization(`Bearer ${getCookie('token')}`);
      config.headers.setAuthorization(
        `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
      );
    } else {
      if (getCookie('token')) {
        config.headers.Authorization = `Bearer ${getCookie('token')}`;
      } else {
        config.headers.Authorization = `Bearer ${
          import.meta.env.VITE_TMDB_TOKEN
        }`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosHttpClient.interceptors.response.use(
  async (response) => {
    if (response.data) {
      return JSON.parse(response.data);
    } else {
      return response.statusText;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosHttpClient;

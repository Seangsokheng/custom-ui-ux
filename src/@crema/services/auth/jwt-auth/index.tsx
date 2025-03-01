import axios from '@crema/services/axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

const jwtAxios = axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
jwtAxios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error: any) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

jwtAxios.interceptors.response.use(
  (res: AxiosResponse<any, any>) => {
    console.log('API Response:', {
      status: res.status,
      data: res.data,
    });
    return res;
  },
  (err: any) => {
    console.error('Response Error:', err.response || err);
    if (err.response && err.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  }
);

export const setAuthToken = (token?: string) => {
  if (token) {
    jwtAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete jwtAxios.defaults.headers.common.Authorization;
    localStorage.removeItem('token');
  }
};

export default jwtAxios;
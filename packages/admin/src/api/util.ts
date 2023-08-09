import { getTokenFromCache, logout } from '@/utils';
import { RequestError } from '@eth/types';
import { message } from 'antd';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

export const request: AxiosInstance = axios.create({
  baseURL: '/api/admin',
  timeout: 10000,
  withCredentials: true,
});

export function onRequestFulfilled(config: InternalAxiosRequestConfig) {
  const token = getTokenFromCache();

  const finalConfig = {
    ...config,
    headers: {
      Authorization: `Bearer ${token}`,
      ...config.headers,
    },
  };

  return finalConfig as InternalAxiosRequestConfig;
}

export function onRequestRejected(error: AxiosError) {
  return Promise.reject(error);
}

export function onResponseFulfilled(response: AxiosResponse) {
  return response.data;
}

export function onResponseRejected(error: AxiosError<RequestError>) {
  const { response } = error;

  if (response?.status === 401 && window.location.pathname !== '/login') {
    logout();
    window.location.href = '/login';
  }

  if (response?.status !== 200) {
    message.error(response?.data?.message);
  }

  return Promise.reject(response?.data);
}

request.interceptors.request.use(onRequestFulfilled, onRequestRejected);

request.interceptors.response.use(onResponseFulfilled, onResponseRejected);

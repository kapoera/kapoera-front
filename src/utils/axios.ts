import axios from 'axios';
import * as AuthUtils from '@/utils/auth';
import config from '@/config';

const instance = axios.create({
  baseURL: config.baseURL
});

instance.interceptors.request.use(config => {
  const token = AuthUtils.getAccessToken();

  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response.status === 403 &&
      error.response.data.expired &&
      !originalRequest._retry &&
      AuthUtils.getRefreshToken() !== null
    ) {
      originalRequest._retry = true;
      const accessToken = await AuthUtils.requestAccessToken();
      AuthUtils.setAccessToken(accessToken);
      return instance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default instance;

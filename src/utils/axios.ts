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

export default instance;

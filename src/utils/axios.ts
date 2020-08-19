import axios from 'axios';
import * as AuthUtils from '@/utils/auth';

const instance = axios.create({
  baseURL: 'http://aria.sparcs.org:32960'
});

instance.interceptors.request.use(config => {
  const token = AuthUtils.getAccessToken();

  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});

export default instance;

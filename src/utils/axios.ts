import axios from 'axios';
import * as AuthUtils from '@/utils/auth';
import config from '@/config';

const instance = axios.create({
  baseURL: config.baseURL,
  withCredentials: true
});

export default instance;

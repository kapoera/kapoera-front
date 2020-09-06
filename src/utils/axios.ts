import axios from 'axios';
import config from '@/config';

const instance = axios.create({
  baseURL: config.baseURL,
  withCredentials: true,
  // headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
});

export default instance;

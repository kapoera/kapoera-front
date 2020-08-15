import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://aria.sparcs.org:32960'
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('kapoera-jwt');

  if (token)
    config.headers = {
      'X-Access-Token': `Bearer ${token}`
    };

  return config;
});

export default instance;

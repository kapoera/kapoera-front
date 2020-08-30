import React, { useEffect } from 'react';
import axios from '@/utils/axios';

const LoginRedirect: React.FC = () => {
  useEffect(() => {
    const redirect = async () => {
      const {
        data: { url }
      }: { data: { url: string } } = await axios.post('/auth/login-sso');
      window.location.href = url;
    };

    redirect();
  }, []);

  return null;
};

export default LoginRedirect;

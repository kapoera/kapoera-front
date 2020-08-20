import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from '@/utils/axios';
import * as AuthUtils from '@/utils/auth';
import { GlobalContext, Actions, User } from '@/context';

interface LoginResponseSuccess {
  success: boolean;
  is_new: boolean;
  accessToken: string;
  refreshToken: string;
  userinfo: User;
}

interface LoginResponseFail {
  success: boolean;
  message: string;
}

type LoginResponse = LoginResponseSuccess | LoginResponseFail;

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { dispatch } = useContext(GlobalContext);

  const submitHandler = async () => {
    try {
      const { data }: { data: LoginResponse } = await axios.post(
        '/auth/login',
        { username, password }
      );

      if (data.success) {
        const {
          accessToken,
          refreshToken,
          userinfo
        } = data as LoginResponseSuccess;
        AuthUtils.login(accessToken, refreshToken);
        dispatch({ type: Actions.Login });
        dispatch({ type: Actions.SetInfo, payload: userinfo });
      }
    } catch (err) {}
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px'
      }}
    >
      <h1>Login</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        Username
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        Password
        <input
          type="text"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button style={{ marginTop: '10px' }} onClick={submitHandler}>
        Submit
      </button>
    </div>
  );
};

interface LoginPageProps {
  className?: string;
}

const Login: React.FC<LoginPageProps> = ({ className }: LoginPageProps) => {
  const { state } = useContext(GlobalContext);

  return state.isLoggedIn ? (
    <Redirect to="/" />
  ) : (
    <div
      className={className}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <LoginForm />
    </div>
  );
};

export default Login;

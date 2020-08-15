import React, { useState } from 'react';
import axios from '@/utils/axios';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async () => {
    console.log({ username, password });

    try {
      const result = await axios.post('/login', {
        username,
        password
      });
      console.log(result);
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

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async () => {
    try {
      const result = await axios.post('/signup', {
        username,
        nickname,
        password
      });
      console.log(result);
    } catch (err) {}
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        marginRight: '30px'
      }}
    >
      <h1>Register</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        Username
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        Nickname
        <input
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
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
  className: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ className }: LoginPageProps) => {
  return (
    <div
      className={className}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <RegisterForm />
      <LoginForm />
    </div>
  );
};

export default LoginPage;

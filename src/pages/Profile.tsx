import React, { useContext } from 'react';
import { GlobalContext } from '@/context';

const Profile: React.FC = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const {
    user: { username, nickname }
  } = state;

  return <div>Profile page for {username}</div>;
};

export default Profile;

import React, { useContext, useState } from 'react';
import { GlobalContext } from '@/context';
import { Container, Input } from 'semantic-ui-react';

const Profile: React.FC = () => {
  const { state } = useContext(GlobalContext);
  const { nickname, username } = state.user || { nickname: '', username: '' };
  const [inputNickname, setInputNickname] = useState<string>(nickname);

  return (
    <Container
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input label="username" type="text" value={username} />
        <Input
          label="nickname"
          type="text"
          value={inputNickname || nickname}
          onChange={(_, data) => {
            setInputNickname(data.value);
          }}
          action={{ color: 'teal', content: 'Save Changes' }}
        />
      </div>
    </Container>
  );
};

export default Profile;

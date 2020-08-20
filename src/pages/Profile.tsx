import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext, Actions } from '@/context';
import { Container, Input, Popup } from 'semantic-ui-react';
import axios from '@/utils/axios';

const Profile: React.FC = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { nickname, username } = state.user || { nickname: '', username: '' };
  const [inputNickname, setInputNickname] = useState<string>(nickname);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    setInputNickname(nickname);
  }, [nickname]);

  const handleNicknameSubmit = async () => {
    if (inputNickname === '') return;

    const {
      data: { success, message }
    }: {
      data: { success: boolean; message?: string };
    } = await axios.post('/api/nickname', { nickname: inputNickname });

    if (success) {
      dispatch({ type: Actions.UpdateNickname, payload: inputNickname });
    } else {
      setPopupOpen(true);
      setTimeout(() => {
        setPopupOpen(false);
      }, 3000);
    }
  };

  return (
    <Container
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input label="username" type="text" value={username} />
        <Popup
          trigger={
            <Input
              label="nickname"
              type="text"
              value={inputNickname}
              onChange={(_, data) => {
                setInputNickname(data.value);
              }}
              action={{
                color: 'teal',
                content: 'Save Changes',
                onClick: handleNicknameSubmit
              }}
            />
          }
          content="Nickname taken. Please try another nickname"
          position="top right"
          open={popupOpen}
          inverted
        />
      </div>
    </Container>
  );
};

export default Profile;

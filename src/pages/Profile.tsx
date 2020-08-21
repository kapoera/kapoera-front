import React, { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Container, Grid, Header, Input, Popup } from 'semantic-ui-react';
import { GlobalContext, Actions } from '@/context';
import axios from '@/utils/axios';

const StyledHeader = styled(Header)`
  margin-bottom: 30px !important;
`;

const Profile: React.FC = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { nickname, username } = state.user || { nickname: '', username: '' };
  const [inputNickname, setInputNickname] = useState<string>(nickname);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const { formatMessage: f } = useIntl();

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
    <Container>
      <StyledHeader as="h1">{f({ id: 'profile_header' })}</StyledHeader>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={4} verticalAlign="middle">
            {f({ id: 'profile_username' })}
          </Grid.Column>
          <Grid.Column>
            <Input type="text" value={username} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={4} verticalAlign="middle">
            {f({ id: 'profile_nickname' })}
          </Grid.Column>
          <Grid.Column>
            <Popup
              trigger={
                <Input
                  type="text"
                  value={inputNickname}
                  onChange={(_, data) => {
                    setInputNickname(data.value);
                  }}
                  action={{
                    color: 'teal',
                    content: f({ id: 'profile_save_changes' }),
                    onClick: handleNicknameSubmit,
                    disabled: nickname === inputNickname
                  }}
                />
              }
              content="Nickname taken. Please try another nickname"
              position="top right"
              open={popupOpen}
              inverted
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Profile;

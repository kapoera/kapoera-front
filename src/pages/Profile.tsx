import React, { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Grid, Input, Popup, Segment } from 'semantic-ui-react';
import { GlobalContext, Actions } from '@/context';
import axios from '@/utils/axios';
import { RankingResponse } from '@/types';
import { ordinalSuffix } from '@/utils/commons';

const StyledHeader = styled.div`
  display: flex;
  font-size: calc(1.5rem + 2vmin);
  justify-content: center;
  margin-bottom: 30px !important;
  margin-top: 30px !important;
`;

const ProfileContainer = styled.div`
  margin: 0 auto;
  max-width: 700px;
`;

const Profile: React.FC = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { nickname } = state.user || { nickname: '' };
  const [inputNickname, setInputNickname] = useState<string>(nickname);
  const [userRanking, setUserRanking] = useState<{
    score: number;
    ranking: number;
  }>({ score: 0, ranking: 0 });
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const { formatMessage: f } = useIntl();
  const username = '';

  useEffect(() => {
    setInputNickname(nickname);
  }, [nickname]);

  const handleNicknameSubmit = async () => {
    if (inputNickname === '') return;

    const {
      data: { success, message }
    }: {
      data: { success: boolean; message?: string };
    } = await axios.post('/api/private/nickname', { nickname: inputNickname });

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
    <ProfileContainer>
      <StyledHeader>{f({ id: 'profile.header' })}</StyledHeader>
      <Segment
        as="div"
        textAlign="center"
        style={{ height: '200px', display: 'flex', alignItems: 'center' }}
      >
        <Grid centered>
          <Grid.Row columns={2}>
            <Grid.Column width={4} verticalAlign="middle">
              {f({ id: 'profile.score' })}
            </Grid.Column>
            <Grid.Column stretched width={10} textAlign="center">
              {userRanking.score}
              {f({ id: 'billboard.score_unit' })}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={4} verticalAlign="middle">
              {f({ id: 'profile.ranking' })}
            </Grid.Column>
            <Grid.Column stretched width={10} textAlign="center">
              {userRanking.ranking}
              {ordinalSuffix(userRanking.ranking)}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={4} verticalAlign="middle">
              {f({ id: 'profile.nickname' })}
            </Grid.Column>
            <Grid.Column stretched width={10}>
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
                      content: f({ id: 'profile.save_changes' }),
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
      </Segment>
    </ProfileContainer>
  );
};

export default Profile;

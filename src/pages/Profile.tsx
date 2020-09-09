import React, { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import {
  Button,
  Grid,
  Input,
  InputOnChangeData,
  Popup,
  Segment
} from 'semantic-ui-react';
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
  const [popupContent, setPopupContent] = useState<string>('');
  const [userRanking, setUserRanking] = useState<{
    score: number;
    ranking: number;
  }>({ score: 0, ranking: 0 });
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const { formatMessage: f } = useIntl();

  useEffect(() => {
    setInputNickname(nickname);
  }, [nickname]);

  useEffect(() => {
    const fetchRanking = async () => {
      const { data }: { data: RankingResponse } = await axios.get(
        '/api/private/rankings/top'
      );

      if (data.success && data.user) setUserRanking(data.user);
    };

    fetchRanking();
  }, []);

  const handleNicknameChange = (_, data: InputOnChangeData) => {
    setInputNickname(data.value);

    if (!(0 < data.value.length && data.value.length <= 10)) {
      setPopupContent(f({ id: 'profile.nickname_error' }));
      setPopupOpen(true);
    } else {
      setPopupOpen(false);
    }
  };

  const handleNicknameSubmit = async () => {
    if (inputNickname === '') return;

    const {
      data: { success }
    }: {
      data: { success: boolean; message?: string };
    } = await axios.post('/api/private/nickname', { nickname: inputNickname });

    if (success) {
      dispatch({ type: Actions.UpdateNickname, payload: inputNickname });
    } else {
      setPopupContent('Nickname taken. Please try another nickname');
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
        style={{ height: '250px', display: 'flex', alignItems: 'center' }}
      >
        <Grid centered>
          <Grid.Row columns={2}>
            <Grid.Column
              width={4}
              verticalAlign="middle"
              style={{ fontSize: 'calc(1rem + 0.5vmin)' }}
            >
              {f({ id: 'profile.score' })}
            </Grid.Column>
            <Grid.Column
              stretched
              width={10}
              style={{ paddingLeft: '30px', fontSize: 'calc(1rem + 0.5vmin)' }}
            >
              {userRanking.score}
              {f({ id: 'billboard.score_unit' })}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column
              width={4}
              verticalAlign="middle"
              style={{ fontSize: 'calc(1rem + 0.5vmin)' }}
            >
              {f({ id: 'profile.ranking' })}
            </Grid.Column>
            <Grid.Column
              stretched
              width={10}
              style={{ paddingLeft: '30px', fontSize: 'calc(1rem + 0.5vmin)' }}
            >
              {userRanking.ranking}
              {ordinalSuffix(userRanking.ranking)}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column
              width={4}
              verticalAlign="middle"
              style={{ fontSize: 'calc(1rem + 0.5vmin)' }}
            >
              {f({ id: 'profile.nickname' })}
            </Grid.Column>
            <Grid.Column stretched width={10}>
              <Popup
                trigger={
                  <Input
                    type="text"
                    value={inputNickname}
                    onChange={handleNicknameChange}
                  />
                }
                content={popupContent}
                position="top right"
                open={popupOpen}
                inverted
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Button
              color="teal"
              onClick={handleNicknameSubmit}
              disabled={
                nickname === inputNickname ||
                !(0 < inputNickname.length && inputNickname.length <= 10)
              }
            >
              {f({ id: 'profile.save_changes' })}
            </Button>
          </Grid.Row>
        </Grid>
      </Segment>
    </ProfileContainer>
  );
};

export default Profile;

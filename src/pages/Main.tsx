import React, { useEffect, useContext, useState } from 'react';
import { Container, Grid, Transition } from 'semantic-ui-react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { GameCard, GameCardProps } from '@/components/GameCard';
import Billboard from '@/components/Billboard';
import MyStatusCard from '@/components/MyStatusCard';
import StatusBanner from '@/components/StatusBanner';
import { GlobalContext } from '@/context';
import axios from '@/utils/axios';
import { RankingI, RankingResponse } from '@/types';

const MainHeader = styled.div`
  font-size: calc(2rem + 2.5vmin);
  margin-left: 30px;
`;

const Main: React.FC = () => {
  const [gamesData, setGamesData] = useState([]);
  const [rankings, setRankings] = useState<RankingI[]>([]);
  const [userRanking, setUserRanking] = useState<{
    score: number;
    ranking: number;
  } | null>(null);
  const { formatMessage: f } = useIntl();
  const {
    state: { user, isLoggedIn }
  } = useContext(GlobalContext);
  const { nickname } = user || { nickname: '' };
  const history = useHistory();

  useEffect(() => {
    const fetchGames = async () => {
      const { data }: { data: GameCardProps[] } = await axios.get('/api/games');
      setGamesData(data);
    };

    const fetchRanking = async () => {
      const { data }: { data: RankingResponse } = await axios.get(
        isLoggedIn ? '/api/private/rankings/top' : '/api/rankings/top'
      );

      if (data.success) {
        if (data.user) setUserRanking(data.user);
        setRankings(data.rankings);
      }
    };

    fetchGames();
    fetchRanking();
  }, [isLoggedIn]);

  return (
    <Container>
      <Transition transitionOnMount duration={300}>
        <StatusBanner />
      </Transition>
      <div style={{ marginTop: '80px', marginBottom: '60px' }}>
        <MainHeader>{f({ id: 'main.rankings' })}</MainHeader>
        <Grid
          columns={2}
          stackable
          style={{ marginTop: '1vmin', padding: '14px 0' }}
        >
          <Grid.Column width={12}>
            <Billboard rankings={rankings} />
          </Grid.Column>
          <Grid.Column width={4} style={{ padding: 0 }}>
            <MyStatusCard
              {...userRanking}
              isLoggedIn={isLoggedIn}
              nickname={nickname}
            />
          </Grid.Column>
        </Grid>
      </div>
      <div style={{ marginBottom: "15rem" }}>
        <MainHeader>{f({ id: 'main.games' })}</MainHeader>
        <Grid columns={3} doubling stackable style={{ marginTop: '1vmin' }}>
          {gamesData.map(data => (
            <Transition key={data.game_type} transitionOnMount duration={500}>
              <Grid.Column>
                <GameCard
                  {...data}
                  clickEvent={game_type => history.push(`/game/${game_type}`)}
                />
              </Grid.Column>
            </Transition>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default Main;

import React, { useEffect, useContext, useState } from 'react';
import { Container, Grid, Transition } from 'semantic-ui-react';
import { useIntl } from 'react-intl';
import { GameCard, GameCardProps } from '@/components/GameCard';
import { Billboard, RankingI } from '@/components/Billboard';
import MyStatusCard from '@/components/MyStatusCard';
import StatusBanner from '@/components/StatusBanner';
import { GlobalContext } from '@/context';
import axios from '@/utils/axios';

interface RankingResponse {
  success: boolean;
  rankings?: RankingI[];
  user?: { score: number; ranking: number };
}

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
      {rankings && (
        <div style={{ marginTop: '80px', marginBottom: '100px' }}>
          <div
            style={{
              marginLeft: '30px',
              marginBottom: '60px',
              fontSize: '4rem'
            }}
          >
            {f({ id: 'main.rankings' })}
          </div>
          <Grid columns={2} stackable>
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
      )}
      <div>
        <div
          style={{ marginLeft: '30px', marginBottom: '40px', fontSize: '4rem' }}
        >
          {f({ id: 'main.games' })}
        </div>
        <Grid columns={3} doubling stackable>
          {gamesData.map(data => (
            <Transition key={data.game_type} transitionOnMount duration={500}>
              <Grid.Column>
                <GameCard {...data} />
              </Grid.Column>
            </Transition>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default Main;

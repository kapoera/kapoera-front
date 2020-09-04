import React, { useEffect, useState } from 'react';
import { Container, Grid, Transition } from 'semantic-ui-react';
import axios from '@/utils/axios';
import { GameCard, GameCardProps } from '@/components/GameCard';
import { Billboard, RankingI } from '@/components/Billboard';
import StatusBanner from '@/components/StatusBanner';

interface RankingResponse {
  success: boolean;
  rankings?: RankingI[];
}

const Main: React.FC = () => {
  const [gamesData, setGamesData] = useState([]);
  const [rankings, setRankings] = useState<RankingI[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const { data }: { data: GameCardProps[] } = await axios.get('/api/games');
      setGamesData(data);
    };

    const fetchRanking = async () => {
      const { data }: { data: RankingResponse } = await axios.get(
        '/api/rankings/top?limit=5'
      );
      setRankings(data.rankings);
    };

    fetchGames();
    fetchRanking();
  }, []);

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
            Rankings
          </div>
          <Billboard rankings={rankings} />
        </div>
      )}
      <div>
        <div
          style={{ marginLeft: '30px', marginBottom: '40px', fontSize: '4rem' }}
        >
          Games
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

import React, { useEffect, useState } from 'react';
import { Container, Grid, Transition } from 'semantic-ui-react';
import axios from '@/utils/axios';
import { GameCard, GameCardProps } from '@/components/GameCard';
import StatusBanner from '@/components/StatusBanner';

const Main: React.FC = () => {
  const [gamesData, setGamesData] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const { data }: { data: GameCardProps[] } = await axios.get('/api/games');
      setGamesData(data);
    };

    fetchGames();
  }, []);

  return (
    <Container>
      <Transition transitionOnMount duration={300}>
        <StatusBanner />
      </Transition>
      <Grid columns={3} doubling stackable>
        {gamesData.map(data => (
          <Transition key={data.game_type} transitionOnMount duration={500}>
            <Grid.Column>
              <GameCard {...data} />
            </Grid.Column>
          </Transition>
        ))}
      </Grid>
    </Container>
  );
};

export default Main;

import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Header, Transition } from 'semantic-ui-react';
import { GlobalContext } from '@/context';
import axios from '@/utils/axios';
import { GameCard, GameCardProps } from '@/components/GameCard';

const Main: React.FC = () => {
  const { state, dispatch } = useContext(GlobalContext);
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
      <Header as="h1">Main</Header>
      <Grid columns={3} doubling stackable>
        {gamesData.map(data => (
          <Transition key={data.game_type} transitionOnMount>
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

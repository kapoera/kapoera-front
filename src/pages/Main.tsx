import React, { useContext } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { GlobalContext } from '@/context';
import GameCard from '@/components/GameCard';

const mockData: {
  playing: boolean;
  result: [number, number];
  startingTime: Date;
  gameType: string;
}[] = [
  {
    playing: true,
    result: [1, 2],
    startingTime: new Date(),
    gameType: 'kart'
  },
  {
    playing: false,
    result: [0, 0],
    startingTime: new Date(),
    gameType: 'lol'
  },
  {
    playing: true,
    result: [10, 0],
    startingTime: new Date(),
    gameType: 'ai'
  },
  {
    playing: true,
    result: [0, 5],
    startingTime: new Date(),
    gameType: 'quiz'
  },
  {
    playing: false,
    result: [0, 0],
    startingTime: new Date(),
    gameType: 'hacking'
  }
];

const Main: React.FC = () => {
  const { state, dispatch } = useContext(GlobalContext);

  return (
    <Container>
      <div>Main</div>
      <Grid columns={3} stackable>
        {mockData.map(data => (
          <Grid.Column key={data.gameType}>
            <GameCard {...data} />
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
};

export default Main;

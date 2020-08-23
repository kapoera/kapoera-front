import React, { useContext } from 'react';
import { Container } from 'semantic-ui-react';
import { GlobalContext } from '@/context';
import GameCard from '@/components/GameCard';

const Main: React.FC = () => {
  const { state, dispatch } = useContext(GlobalContext);

  return (
    <Container>
      <div>Main</div>
      <GameCard
        gameType="카트라이더"
        playing={true}
        winner="KAIST"
        result={[1, 2]}
        startingTime={new Date()}
      />
    </Container>
  );
};

export default Main;

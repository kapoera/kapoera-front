import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import { GameCardProps, University, GameStatus } from '@/components/GameCard';
import LolImage from '@/public/lol.jpg';

const mockData: GameCardProps = {
  dividend: 1000,
  game_type: 'ai',
  kaist_arr: [],
  postech_arr: [],
  playing: GameStatus.Exiting,
  result: { [University.Kaist]: 30, [University.Postech]: 10 },
  starting_time: '2020-08-24T14:21:18.242Z'
};

const DimmedImage = styled(Image)`
  opacity: 0.5;
`;

const GameOverlay = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fafafa;
  display: flex;
  font-size: 3rem;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

interface GameStatusBannerProps {
  children: React.ReactChild;
  src: any;
}

const GameStatusBanner: React.FC<GameStatusBannerProps> = ({
  children,
  src
}: GameStatusBannerProps) => {
  return (
    <div style={{ position: 'relative', marginBottom: '15px' }}>
      <DimmedImage fluid src={src} alt="Lol Image" />
      <GameOverlay>{children}</GameOverlay>
    </div>
  );
};

const Game: React.FC = () => {
  const { gameId }: { gameId: string } = useParams();
  const data = mockData;

  return (
    <Container>
      <GameStatusBanner src={LolImage}>Hello World</GameStatusBanner>
    </Container>
  );
};

export default Game;

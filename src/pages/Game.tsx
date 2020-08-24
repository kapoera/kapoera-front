import React from 'react';
import { useParams } from 'react-router-dom';

const Game: React.FC = () => {
  const { gameId }: { gameId: string } = useParams();

  return <div>Game: {gameId}</div>;
};

export default Game;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedDate, useIntl } from 'react-intl';
import { Container, Grid, Image, Label, Progress } from 'semantic-ui-react';
import io from 'socket.io-client';
import styled from 'styled-components';
import { GameCardProps, University, GameStatus } from '@/components/GameCard';
import config from '@/config';
import KaistLogo from '@/public/kaist.png';
import PostechLogo from '@/public/postech.png';
import LolImage from '@/public/lol.jpg';
import axios from '@/utils/axios';

const DimmedImage = styled(Image)`
  opacity: 0.35;
`;

const GameOverlay = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.65);
  color: #fafafa;
  display: flex;
  font-size: calc(1rem + 1.5vmin);
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const StyledProgress = styled(Progress)`
  color: #fafafa;
  direction: rtl;
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
      <GameOverlay>
        <div style={{ width: '80%', height: '80%' }}>{children}</div>
      </GameOverlay>
    </div>
  );
};

const defaultState: GameCardProps = {
  dividend: 1000,
  game_type: 'ai',
  kaist_arr: [],
  postech_arr: [],
  playing: GameStatus.Exiting,
  result: { [University.Kaist]: 0, [University.Postech]: 0 },
  starting_time: '2020-08-24T00:00:00.000Z'
};

const Game: React.FC = () => {
  const { gameId }: { gameId: string } = useParams();

  console.log(gameId);
  const [
    { playing, starting_time, result, kaist_arr, postech_arr, game_type },
    setGameData
  ] = useState(defaultState);
  const [kaistRatio, setKaistRatio] = useState<number>(0.0);
  const [postechRatio, setPostechRatio] = useState<number>(0.0);
  const { formatMessage: f } = useIntl();

  useEffect(() => {
    const socket = io(config.socketURL, {
      transports: ['websocket'],
      upgrade: false,
      query: { game: game_type }
    });

    socket.on('refresh', (data: GameCardProps) => {});

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchGame = async () => {
      const { data }: { data: GameCardProps } = await axios.get(
        '/api/games/' + gameId
      );
      setGameData(data);
      if (data.kaist_arr.length + data.postech_arr.length != 0) {
        setKaistRatio(
          (100 * data.kaist_arr.length) /
            (data.kaist_arr.length + data.postech_arr.length)
        );
        setPostechRatio(
          (100 * data.postech_arr.length) /
            (data.kaist_arr.length + data.postech_arr.length)
        );
      }
    };

    fetchGame();
  }, []);

  return (
    <Container>
      <GameStatusBanner src={LolImage}>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column verticalAlign="middle">
              <Image src={KaistLogo} />
            </Grid.Column>
            <Grid.Column textAlign="center" verticalAlign="middle">
              {playing === GameStatus.Running ? (
                <Label color="green" size="huge">
                  {f({ id: 'game.playing' })}
                </Label>
              ) : playing === GameStatus.Waiting ? (
                <div style={{ fontSize: '0.8rem' }}>
                  <FormattedDate
                    value={starting_time}
                    month="2-digit"
                    day="2-digit"
                    hour="2-digit"
                    minute="2-digit"
                    hour12={false}
                  />
                </div>
              ) : (
                <Label color="red" size="huge">
                  {f({ id: 'game.finished' })}
                </Label>
              )}
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <Image src={PostechLogo} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3} style={{ marginBottom: '30px' }}>
            <Grid.Column textAlign="center">
              {result[University.Kaist]}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {f({ id: 'game.score' })}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {result[University.Postech]}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center">-</Grid.Column>
            <Grid.Column textAlign="center">
              {f({ id: 'game.winning' })}
            </Grid.Column>
            <Grid.Column textAlign="center">-</Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <StyledProgress percent={kaistRatio} color="blue" />
            </Grid.Column>
            <Grid.Column>
              <Progress percent={postechRatio} color="red" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </GameStatusBanner>
    </Container>
  );
};

export default Game;

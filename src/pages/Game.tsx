import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { Grid, Image, Label, Progress, Card } from 'semantic-ui-react';
import io from 'socket.io-client';
import styled from 'styled-components';
import { GameCardProps, University, GameStatus } from '@/components/GameCard';
import MainEventPopup from '@/components/MainEventPopup';
import config from '@/config';
import KaistLogo from '@/public/kaist.png';
import PostechLogo from '@/public/postech.png';
import { GlobalContext } from '@/context';
import axios from '@/utils/axios';

interface StyledProgressProps {
  direction: 'left' | 'right';
}

const StyledProgress = styled(Progress)`
  color: #fafafa;
  direction: ${({ direction }: StyledProgressProps) =>
    direction === 'left' ? 'rtl' : 'ltr'};
  margin: 1em 0 !important;
`;

const Banner = styled.div`
  background-color: #696969;
  color: #fff;
  line-height: normal;
  padding: 5px 0;
  text-align: center;
  width: 100%;
`;

interface ColumnContentProps {
  align?: 'left' | 'right';
}

const ColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  ${({ align }: ColumnContentProps) =>
    align ? `text-align: ${align};` : 'align-items: center'};
  font-size: calc(1em + 2vmin);

const GameContainer = styled.div`
  margin: 0 auto;
  max-width: 1000px;
`;

export enum LogoState {
  None = 'NONE',
  Kaist = 'K',
  Postech = 'P'
}

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
  const { state, dispatch } = useContext(GlobalContext);
  const { _id } = state.user || { _id: '0' };
  const { gameId }: { gameId: string } = useParams();
  const [{ playing, starting_time, result, game_type }, setGameData] = useState(
    defaultState
  );
  const [kaistRatio, setKaistRatio] = useState<number>(0.0);
  const [postechRatio, setPostechRatio] = useState<number>(0.0);
  const [currentBetting, setCurrentBetting] = useState<LogoState>(
    LogoState.None
  );
  const { formatMessage: f } = useIntl();

  useEffect(() => {
    const socket = io(config.socketURL, {
      transports: ['websocket'],
      upgrade: false,
      query: { game: gameId }
    });
    socket.on('refresh', (data: GameCardProps) => {
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
    });

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

      if (data.kaist_arr.includes(_id)) {
        setCurrentBetting(LogoState.Kaist);
      } else if (data.postech_arr.includes(_id)) {
        setCurrentBetting(LogoState.Postech);
      } else {
        setCurrentBetting(LogoState.None);
      }

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
  }, [_id]);

  return (
    <GameContainer>
      <Banner>{f({ id: `game.${gameId}` })}</Banner>
      <Grid style={{ position: 'relative', margin: 0, height: '20vh' }}>
        <Grid.Row columns={4} style={{ padding: 0 }}>
          <Grid.Column style={{ backgroundColor: '#a5dff9', height: '100%' }}>
            <ColumnContent>
              <Image src={KaistLogo} size="medium" style={{ width: '100%' }} />
            </ColumnContent>
          </Grid.Column>
          <Grid.Column style={{ backgroundColor: '#a5dff9', height: '100%' }}>
            <ColumnContent align="left">
              {result[University.Kaist]}
            </ColumnContent>
          </Grid.Column>
          <Grid.Column style={{ backgroundColor: '#ffbbd6', height: '100%' }}>
            <ColumnContent align="right">
              {result[University.Postech]}
            </ColumnContent>
          </Grid.Column>
          <Grid.Column style={{ backgroundColor: '#ffbbd6', height: '100%' }}>
            <ColumnContent>
              <Image
                src={PostechLogo}
                size="medium"
                style={{ width: '100%' }}
              />
            </ColumnContent>
          </Grid.Column>
        </Grid.Row>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {playing === GameStatus.Running ? (
            <Label color="green" size="huge">
              {f({ id: 'game.playing' })}
            </Label>
          ) : playing === GameStatus.Waiting ? (
            <Label color="black" size="huge" style={{ fontSize: '0.8rem' }}>
              <FormattedDate
                value={starting_time}
                month="2-digit"
                day="2-digit"
                hour="2-digit"
                minute="2-digit"
                hour12={false}
              />
            </Label>
          ) : (
            <Label color="red" size="huge">
              {f({ id: 'game.finished' })}
            </Label>
          )}
        </div>
      </Grid>
      <Card centered fluid>
        <Card.Content>
          <Grid columns={3}>
            <Grid.Row centered>
              <Grid.Column width={7} stretched style={{ paddingRight: 0 }}>
                <StyledProgress
                  percent={kaistRatio}
                  color="blue"
                  direction="left"
                />
              </Grid.Column>
              <Grid.Column
                verticalAlign="middle"
                width={2}
                style={{ padding: 0 }}
              >
                <div
                  style={{
                    fontSize: 'calc(0.5rem + 1vmin)',
                    fontWeight: 'bold'
                  }}
                >
                  <FormattedMessage
                    id="betting.status"
                    values={{ br: <br /> }}
                  />
                </div>
              </Grid.Column>
              <Grid.Column width={7} stretched style={{ paddingLeft: 0 }}>
                <StyledProgress
                  direction="right"
                  percent={postechRatio}
                  color="red"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
        <Card.Content style={{ display: 'flex', alignItems: 'center' }}>
          <MainEventPopup
            currentBetting={currentBetting}
            setCurrentBetting={setCurrentBetting}
            game_type={game_type}
          ></MainEventPopup>
        </Card.Content>
      </Card>
    </GameContainer>
  );
};

export default Game;

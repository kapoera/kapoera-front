import React, { useEffect, useState, useContext, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedDate, useIntl } from 'react-intl';
import { Grid, Image, Label, Progress, Segment } from 'semantic-ui-react';
import io from 'socket.io-client';
import styled from 'styled-components';
import { GameCardProps, University, GameStatus } from '@/components/GameCard';
import EventList from '@/components/EventList';
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
  align-items: center;
  display: flex;
  font-size: calc(1.5em + 2vmin);
  height: 10vh;
  line-height: normal;
  margin-left: 30px;
`;

interface ColumnContentProps {
  align?: 'left' | 'right';
}

const ColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: calc(1em + 2vmin);
  height: 100%;
  justify-content: center;
  ${({ align }: ColumnContentProps) =>
    align ? `text-align: ${align};` : 'align-items: center'};
`;

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
  starting_time: '2020-08-24T00:00:00.000Z',
  subevents: [],
  clickEvent: () => {}
};

interface GameState {
  kaistRatio: number;
  kaistLength: number;
  postechRatio: number;
  postechLength: number;
}

function reducer(
  state: GameState,
  action:
    | { type: 'UPDATE_RATIO'; payload: [number, number] }
    | { type: 'INCREMENT'; payload: 'KAIST' | 'POSTECH' }
    | { type: 'SET_BETTING'; payload: LogoState }
) {
  switch (action.type) {
    case 'UPDATE_RATIO':
      return {
        ...state,
        kaistRatio:
          (100 * action.payload[0]) / (action.payload[0] + action.payload[1]),
        kaistLength: action.payload[0],
        postechRatio:
          (100 * action.payload[1]) / (action.payload[0] + action.payload[1]),
        postechLength: action.payload[1]
      };
    case 'INCREMENT':
      return reducer(state, {
        type: 'UPDATE_RATIO',
        payload:
          action.payload === 'KAIST'
            ? [state.kaistLength + 1, state.postechLength]
            : [state.kaistLength, state.postechLength + 1]
      });
    case 'SET_BETTING':
      return {
        ...state,
        currentBetting: action.payload
      };
    default:
      return state;
  }
}

const Game: React.FC = () => {
  const { formatMessage: f } = useIntl();
  const { state: globalState } = useContext(GlobalContext);
  const { _id } = globalState.user || { _id: '0' };

  const [state, dispatch] = useReducer(reducer, {
    kaistRatio: 0,
    kaistLength: 0,
    postechRatio: 0,
    postechLength: 0,
    currentBetting: LogoState.None
  });
  const {
    kaistRatio,
    kaistLength,
    postechRatio,
    postechLength,
    currentBetting
  } = state;

  const { gameId }: { gameId: string } = useParams();
  const [
    { playing, starting_time, result, game_type, dividend },
    setGameData
  ] = useState(defaultState);

  // useEffect(() => {
  //   const socket = io(config.socketURL, {
  //     transports: ['websocket'],
  //     upgrade: false,
  //     query: { game: gameId }
  //   });
  //   socket.on('refresh', (data: GameCardProps) => {
  //     if (data.kaist_arr.length + data.postech_arr.length !== 0)
  //       dispatch({
  //         type: 'UPDATE_RATIO',
  //         payload: [data.kaist_arr.length, data.postech_arr.length]
  //       });
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    const fetchGame = async () => {
      const { data }: { data: GameCardProps } = await axios.get(
        '/api/games/' + gameId
      );
      setGameData(data);
      if (data.kaist_arr.includes(_id)) {
        dispatch({ type: 'SET_BETTING', payload: LogoState.Kaist });
      } else if (data.postech_arr.includes(_id)) {
        dispatch({ type: 'SET_BETTING', payload: LogoState.Postech });
      } else {
        dispatch({ type: 'SET_BETTING', payload: LogoState.None });
      }

      if (data.kaist_arr.length + data.postech_arr.length !== 0)
        dispatch({
          type: 'UPDATE_RATIO',
          payload: [data.kaist_arr.length, data.postech_arr.length]
        });
    };
    fetchGame();
  }, [_id]);

  return (
    <GameContainer>
      <Banner>{f({ id: `game.${gameId}` })}</Banner>
      <Grid
        style={{
          position: 'relative',
          margin: 0,
          height: '20vh'
        }}
      >
        <Grid.Row columns={4} style={{ padding: 0 }}>
          <Grid.Column
            style={{
              backgroundColor: '#a5dff9',
              height: '100%',
              borderTopLeftRadius: '20px',
              borderBottomLeftRadius: '20px'
            }}
          >
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
          <Grid.Column
            style={{
              backgroundColor: '#ffbbd6',
              height: '100%',
              borderTopRightRadius: '20px',
              borderBottomRightRadius: '20px'
            }}
          >
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
            <Label
              size="medium"
              style={{
                textAlign: 'center',
                lineHeight: 1.2,
                background: config.primary,
                borderColor: config.primary,
                color: 'white'
              }}
            >
              {f({ id: 'game.label_message' })}
              <br />
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
      <Segment>
        <div style={{ marginLeft: '20px', display: 'flex' }}>
          <div
            style={{
              fontSize: 'calc(1rem + 2vmin)',
              lineHeight: 'normal',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '20px'
            }}
          >
            {f({ id: 'betting.status' })}
          </div>
          <div style={{ padding: '10px 0' }}>
            <MainEventPopup
              currentBetting={currentBetting}
              dispatch={dispatch}
              game_type={game_type}
              playing={playing}
              dividend={dividend}
              bets={[kaistLength, postechLength]}
            />
          </div>
        </div>
        <Grid columns={2}>
          <Grid.Row centered>
            <Grid.Column stretched>
              <StyledProgress
                label={`${Math.floor(kaistRatio)}% (${
                  kaistLength + postechLength
                } / ${kaistLength})`}
                percent={Math.floor(kaistRatio)}
                color="blue"
                direction="left"
              />
            </Grid.Column>
            <Grid.Column stretched>
              <StyledProgress
                label={`${Math.floor(postechRatio)}% (${postechLength} / ${
                  kaistLength + postechLength
                })`}
                direction="right"
                percent={Math.floor(postechRatio)}
                color="red"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <EventList gameId={gameId} playing={playing} />
    </GameContainer>
  );
};

export default Game;

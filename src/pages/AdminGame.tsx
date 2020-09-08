import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedDate, useIntl } from 'react-intl';
import {
  Grid,
  Image,
  Label,
  Segment,
  Radio,
  Form,
  Button,
  Input
} from 'semantic-ui-react';
import styled from 'styled-components';
import {
  GameCardProps,
  University,
  GameStatus,
  Winner
} from '@/components/GameCard';
import KaistLogo from '@/public/kaist.png';
import PostechLogo from '@/public/postech.png';
import axios from '@/utils/axios';
import AdminEventList from '@/components/AdminEventList'
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
interface AdminResponse {
  success: boolean;
  message?: string;
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
  clickEvent: _ => { }
};
const defaultWinner = Winner.None;
const defaultPlaying = GameStatus.Waiting;
const defaultResult = { [University.Kaist]: 0, [University.Postech]: 0 };

const AdminGame: React.FC = () => {
  const { gameId }: { gameId: string } = useParams();
  const [{ starting_time, game_type }, setGameData] = useState(defaultState);

  const [initialWinner, setInitialWinner] = useState(defaultWinner);
  const [winner, setWinner] = useState(defaultWinner);
  const [playing, setPlaying] = useState(defaultPlaying);
  const [result, setResult] = useState(defaultResult);
  const { formatMessage: f } = useIntl();
  useEffect(() => {
    const fetchGame = async () => {
      const { data }: { data: GameCardProps } = await axios.get(
        '/api/games/' + gameId
      );
      setGameData(data);
      setWinner(data.winner);
      setInitialWinner(data.winner);
      setPlaying(data.playing);
      setResult(data.result);
    };
    fetchGame();
  }, []);

  const handleWinnerChange = (_, { value }) => {
    setWinner(value);
  };
  const handlePlayingChange = (_, { value }) => {
    setPlaying(value);
  };

  const handleKaistScore = (_, { value }) => {
    setResult({ ...result, [University.Kaist]: value });
  };

  const handlePostechScore = (_, { value }) => {
    setResult({ ...result, [University.Postech]: value });
  };

  const endGame = async () => {
    const {
      data
    }: { data: AdminResponse } = await axios.post(
      '/api/private/admin/end-game',
      { winner: winner, game_type: gameId }
    );
    if (data.success) {
      setInitialWinner(winner);
    }
  };
  const changeStatus = async () => {
    const {
      data
    }: {
      data: AdminResponse;
    } = await axios.post('/api/private/admin/playing-type', {
      playing: playing,
      game_type: gameId
    });
    if (data.success) {
      console.log(data.success);
    }
  };
  const changeScore = async () => {
    const { data }: { data: AdminResponse } = await axios.post(
      '/api/private/admin/score',
      {
        result: result,
        game_type: gameId
      }
    );
    if (data.success) {
      console.log(data.success);
    }
  };
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
            {f({ id: 'game.status' })}
          </div>
          <Form>
            <Form.Field>
              Selected value: <b>{playing}</b>
            </Form.Field>

            <Form.Field
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Radio
                label="waiting"
                value={GameStatus.Waiting}
                name="radioGroup"
                checked={playing === GameStatus.Waiting}
                onChange={handlePlayingChange}
                style={{ marginRight: 'auto' }}
              />
              <Radio
                label="running"
                value={GameStatus.Running}
                name="radioGroup"
                checked={playing === GameStatus.Running}
                onChange={handlePlayingChange}
                style={{ marginRight: 'auto' }}
              />
              <Radio
                label="exiting"
                value={GameStatus.Exiting}
                name="radioGroup"
                checked={playing === GameStatus.Exiting}
                onChange={handlePlayingChange}
                style={{ marginRight: 'auto' }}
              />
            </Form.Field>

            <Button
              content={f({ id: 'game.status.change' })}
              onClick={changeStatus}
            />
          </Form>
        </div>
      </Segment>
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
            {f({ id: 'game.score.change' })}
          </div>
          <Form>
            <Form.Field>
              Selected value: <b>{playing}</b>
            </Form.Field>

            <Form.Field
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Input
                type="number"
                max={5}
                min={0}
                value={result[University.Kaist]}
                onChange={handleKaistScore}
              />
              <Input
                type="number"
                max={5}
                min={0}
                value={result[University.Postech]}
                onChange={handlePostechScore}
              />
            </Form.Field>

            <Button
              content={f({ id: 'game.score.change' })}
              onClick={changeScore}
            />
          </Form>
        </div>
      </Segment>
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
            {f({ id: 'betting.end' })}
          </div>
          <Form>
            <Form.Field>
              Selected value: <b>{winner}</b>
            </Form.Field>

            <Form.Field
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Radio
                label="Kaist"
                value={Winner.Kaist}
                name="radioGroup"
                checked={winner === Winner.Kaist}
                onChange={handleWinnerChange}
                disabled={initialWinner != Winner.None}
                style={{ marginRight: 'auto' }}
              />
              <Radio
                label="Postech"
                value={Winner.Postech}
                name="radioGroup"
                checked={winner === Winner.Postech}
                onChange={handleWinnerChange}
                disabled={initialWinner != Winner.None}
                style={{ marginRight: 'auto' }}
              />
            </Form.Field>

            <Button
              content={f({ id: 'betting.end' })}
              disabled={initialWinner != Winner.None}
              onClick={endGame}
            />
          </Form>
        </div>
      </Segment>
      <AdminEventList gameId={gameId}></AdminEventList>
    </GameContainer>
  );
};

export default AdminGame;


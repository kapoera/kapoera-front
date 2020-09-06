import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { FormattedDate, useIntl } from 'react-intl';
import { Grid, Image, Label } from 'semantic-ui-react';
import KaistLogo from '@/public/kaist.png';
import PostechLogo from '@/public/postech.png';
import Library from '@/public/games';

export enum University {
  Kaist = 'K',
  Postech = 'P'
}

export enum GameStatus {
  Waiting = 'waiting',
  Running = 'running',
  Exiting = 'exiting'
}

export interface GameCardProps {
  dividend: number;
  game_type: string;
  kaist_arr: string[];
  postech_arr: string[];
  playing: GameStatus;
  result: { [key in University]: number };
  starting_time: string;
  winner?: University;
  subevents: number[];
}

export const GameCard: React.FC<GameCardProps> = ({
  game_type,
  playing,
  result,
  starting_time
}: GameCardProps) => {
  const { formatMessage: f } = useIntl();
  const history = useHistory();

  return (
    <Card
      fluid
      link
      as="div"
      onClick={() => {
        history.push(`/game/${game_type}`);
      }}
    >
      <Image src={Library['ai']} wrapped ui={false} />
      <Card.Content>
        <Card.Header as="h1" textAlign="center">
          {f({ id: `game.${game_type}` })}
        </Card.Header>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column verticalAlign="middle">
              <Image src={KaistLogo} />
            </Grid.Column>
            <Grid.Column textAlign="center">
              {playing === GameStatus.Running ? (
                <Label color="green" size="tiny">
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
                <Label color="red" size="tiny">
                  {f({ id: 'game.finished' })}
                </Label>
              )}
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <Image src={PostechLogo} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center">
              <h3>{result[University.Kaist]}</h3>
            </Grid.Column>
            <Grid.Column textAlign="center">
              {f({ id: 'game.score' })}
            </Grid.Column>
            <Grid.Column textAlign="center">
              <h3>{result[University.Postech]}</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center">-</Grid.Column>
            <Grid.Column textAlign="center">
              {f({ id: 'game.winning' })}
            </Grid.Column>
            <Grid.Column textAlign="center">-</Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
};

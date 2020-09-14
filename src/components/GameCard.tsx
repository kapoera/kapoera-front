import React from 'react';
import { Card } from 'semantic-ui-react';
import styled from 'styled-components';
import { FormattedDate, useIntl } from 'react-intl';
import { Grid, Image, Label } from 'semantic-ui-react';
import KaistLogo from '@/public/kaist.png';
import PostechLogo from '@/public/postech.png';
import Library from '@/public/games';
import { GameStatus, University, Winner } from '@/types';

enum RecordWinner {
  KAIST = 'KAIST',
  POSTECH = 'POSTECH'
}

export interface GameCardProps {
  dividend: number;
  game_type: string;
  kaist_arr: string[];
  postech_arr: string[];
  playing: GameStatus;
  result: { [key in University]: number };
  starting_time: string;
  winner?: Winner;
  subevents: number[];
  records: { score: [number, number]; winner: RecordWinner; year: number }[];
  clickEvent: (arg0: string) => void;
}

const StyledImage = styled(Image)`
  > img {
    height: 250px !important;
    object-fit: cover !important;
  }
`;

export const GameCard: React.FC<GameCardProps> = ({
  dividend,
  game_type,
  playing,
  result,
  kaist_arr,
  postech_arr,
  starting_time,
  clickEvent
}: GameCardProps) => {
  const { formatMessage: f } = useIntl();

  return (
    <Card fluid link as="div" onClick={() => clickEvent(game_type)}>
      <StyledImage src={Library[game_type]} wrapped ui={false} />
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
            <Grid.Column textAlign="center">
              {Math.round(dividend / (kaist_arr.length + 1))}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {f({ id: 'game.winning' })}
            </Grid.Column>
            <Grid.Column textAlign="center">
              {Math.round(dividend / (postech_arr.length + 1))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
};

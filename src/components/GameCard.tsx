import React from 'react';
import { Card } from 'semantic-ui-react';
import styled from 'styled-components';
import { FormattedDate, FormattedTime } from 'react-intl';
import { Grid, Image, Label } from 'semantic-ui-react';
import KaistLogo from '@/public/kaist.png';
import PostechLogo from '@/public/postech.png';

interface GameCardProps {
  gameType: string;
  playing: boolean;
  result: [number, number];
  startingTime: Date;
}

const GameCard: React.FC<GameCardProps> = ({
  gameType,
  playing,
  result,
  startingTime
}: GameCardProps) => {
  return (
    <Card style={{ margin: '0 auto' }}>
      <Card.Content>
        <Card.Header as="h1" textAlign="center">
          {gameType}
        </Card.Header>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column verticalAlign="middle">
              <Image src={KaistLogo} />
            </Grid.Column>
            <Grid.Column textAlign="center">
              {playing ? (
                <Label color="green" size="tiny">
                  Playing
                </Label>
              ) : (
                <div style={{ fontSize: '0.8rem' }}>
                  <FormattedDate
                    value={startingTime}
                    month="2-digit"
                    day="2-digit"
                    hour="2-digit"
                    minute="2-digit"
                    hour12={false}
                  />
                </div>
              )}
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <Image src={PostechLogo} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center">
              <h3>{result[0]}</h3>
            </Grid.Column>
            <Grid.Column textAlign="center">점수</Grid.Column>
            <Grid.Column textAlign="center">
              <h3>{result[1]}</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center">-</Grid.Column>
            <Grid.Column textAlign="center">배당률</Grid.Column>
            <Grid.Column textAlign="center">-</Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default GameCard;

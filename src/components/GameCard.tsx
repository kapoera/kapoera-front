import React from 'react';
import { Card } from 'semantic-ui-react';
import { FormattedDate, useIntl } from 'react-intl';
import { Grid, Image, Label } from 'semantic-ui-react';
import KaistLogo from '@/public/kaist.png';
import PostechLogo from '@/public/postech.png';
import QuizImage from '@/public/quiz.jpg';

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
  const { formatMessage: f } = useIntl();

  return (
    <Card fluid>
      <Image src={QuizImage} wrapped ui={false} />
      <Card.Content>
        <Card.Header as="h1" textAlign="center">
          {f({ id: `game.${gameType}` })}
        </Card.Header>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column verticalAlign="middle">
              <Image src={KaistLogo} />
            </Grid.Column>
            <Grid.Column textAlign="center">
              {playing ? (
                <Label color="green" size="tiny">
                  {f({ id: 'game.playing' })}
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
            <Grid.Column textAlign="center">
              {f({ id: 'game.score' })}
            </Grid.Column>
            <Grid.Column textAlign="center">
              <h3>{result[1]}</h3>
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

export default GameCard;

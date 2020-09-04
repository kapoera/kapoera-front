import React from 'react';
import styled from 'styled-components';
import { Grid, Label } from 'semantic-ui-react';

export interface RankingI {
  score: number;
  nickname: string;
}

const BillboardPlain: React.FC<{ rankings: RankingI[] }> = ({
  rankings
}: {
  rankings: RankingI[];
}) => {
  return (
    <div style={{ marginTop: '80px', marginBottom: '100px' }}>
      <div
        style={{ marginLeft: '30px', marginBottom: '40px', fontSize: '4rem' }}
      >
        Rankings
      </div>
      <Grid celled="internally">
        <Grid.Row>
          <Grid.Column width={2} style={{ border: 'none' }}>
            {''}
          </Grid.Column>
          <Grid.Column
            width={7}
            textAlign="center"
            style={{ fontSize: '1.6rem' }}
          >
            Nickname
          </Grid.Column>
          <Grid.Column
            width={7}
            textAlign="center"
            style={{ fontSize: '1.6rem' }}
          >
            Score
          </Grid.Column>
        </Grid.Row>
        {rankings.map((ranking, idx) => (
          <Grid.Row key={ranking.nickname}>
            <Grid.Column width={2}>
              <Label ribbon>{idx + 1}</Label>
            </Grid.Column>
            <Grid.Column
              width={7}
              textAlign="center"
              style={{ fontSize: '1.2rem' }}
            >
              {ranking.nickname}
            </Grid.Column>
            <Grid.Column
              width={7}
              textAlign="center"
              style={{ fontSize: '1.2rem' }}
            >
              {ranking.score}
            </Grid.Column>
          </Grid.Row>
        ))}
      </Grid>
    </div>
  );
};

export const Billboard = styled(BillboardPlain)``;

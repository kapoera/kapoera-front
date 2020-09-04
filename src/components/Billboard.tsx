import React from 'react';
import styled from 'styled-components';
import { Grid, Label } from 'semantic-ui-react';

export interface RankingI {
  score: number;
  nickname: string;
}

interface StyledGridRowProps {
  last: boolean;
}

const StyledGridRow = styled(Grid.Row)`
  background: #fff;
  ${({ last }: StyledGridRowProps) =>
    last &&
    `
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  `}
`;

const StyledGridHeader = styled(Grid.Row)`
  background: #5c5c5c;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  color: #fff;
`;

const BillboardPlain: React.FC<{ rankings: RankingI[] }> = ({
  rankings
}: {
  rankings: RankingI[];
}) => {
  return (
    <Grid
      divided="vertically"
      style={{ maxWidth: '800px', marginLeft: '30px', marginRight: '30px' }}
    >
      <StyledGridHeader>
        <Grid.Column width={2} style={{ border: 'none' }}>
          {''}
        </Grid.Column>
        <Grid.Column
          width={7}
          textAlign="center"
          verticalAlign="middle"
          style={{
            fontSize: '1.8rem',
            marginBottom: 0
          }}
        >
          Nickname
        </Grid.Column>
        <Grid.Column
          width={7}
          textAlign="center"
          verticalAlign="middle"
          style={{
            fontSize: '1.8rem',
            marginBottom: 0
          }}
        >
          Score
        </Grid.Column>
      </StyledGridHeader>
      {rankings.map((ranking, idx) => (
        <StyledGridRow
          key={ranking.nickname}
          last={idx === rankings.length - 1}
        >
          <Grid.Column width={2}>
            <Label ribbon>{idx + 1}</Label>
          </Grid.Column>
          <Grid.Column
            width={7}
            textAlign="center"
            style={{ fontSize: '1.4rem' }}
          >
            {ranking.nickname}
          </Grid.Column>
          <Grid.Column
            width={7}
            textAlign="center"
            style={{ fontSize: '1.4rem' }}
          >
            {ranking.score}
          </Grid.Column>
        </StyledGridRow>
      ))}
    </Grid>
  );
};

export const Billboard = styled(BillboardPlain)``;

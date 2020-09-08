import React from 'react';
import styled from 'styled-components';
import { Grid, Label } from 'semantic-ui-react';
import { useIntl } from 'react-intl';
import { RankingI } from '@/types';

interface StyledGridRowProps {
  last: number;
}

const StyledGridRow = styled(Grid.Row)`
  background: #fff;
  ${({ last }: StyledGridRowProps) =>
    last === 1 &&
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
  const { formatMessage: f } = useIntl();
  const filledRankings =
    rankings.length < 5
      ? rankings.concat(
          [...Array(5 - rankings.length).keys()].map(_ => ({
            score: -1,
            nickname: '-'
          }))
        )
      : rankings;

  return (
    <Grid divided="vertically" style={{ maxWidth: '800px' }}>
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
          {f({ id: 'billboard.nickname' })}
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
          {f({ id: 'billboard.score' })}
        </Grid.Column>
      </StyledGridHeader>
      {filledRankings.map((ranking, idx) => (
        <StyledGridRow
          key={ranking.nickname + idx}
          last={idx === filledRankings.length - 1 ? 1 : 0}
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
            {ranking.score === -1 ? (
              '-'
            ) : (
              <>
                {ranking.score}
                <span style={{ fontSize: '1rem' }}>
                  {' ' + f({ id: 'billboard.score_unit' })}
                </span>
              </>
            )}
          </Grid.Column>
        </StyledGridRow>
      ))}
    </Grid>
  );
};

export default BillboardPlain;

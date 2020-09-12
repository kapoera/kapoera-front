import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Label, Pagination, PaginationProps } from 'semantic-ui-react';
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

interface BillboardProps {
  rankings: RankingI[];
  length: number;
}

const Billboard: React.FC<BillboardProps> = ({
  rankings,
  length
}: BillboardProps) => {
  const itemsPerPage = 5;
  const pages = length / itemsPerPage;

  const { formatMessage: f } = useIntl();
  const filledRankings =
    rankings.length < itemsPerPage * pages
      ? rankings.concat(
          [...Array(itemsPerPage * pages - rankings.length).keys()].map(_ => ({
            score: -1,
            nickname: '-'
          }))
        )
      : rankings;

  const [activePage, setActivePage] = useState<number>(1);

  const handlePaginationChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: PaginationProps
  ) => {
    setActivePage(data.activePage as number);
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Grid divided="vertically">
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
        {filledRankings
          .slice(itemsPerPage * (activePage - 1), itemsPerPage * activePage)
          .map((ranking, idx) => (
            <StyledGridRow
              key={ranking.nickname + idx}
              last={idx === itemsPerPage - 1 ? 1 : 0}
            >
              <Grid.Column width={2}>
                <Label ribbon>
                  {itemsPerPage * (activePage - 1) + idx + 1}
                </Label>
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          activePage={activePage}
          onPageChange={handlePaginationChange}
          totalPages={filledRankings.length / 5}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          style={{ marginTop: '20px' }}
        />
      </div>
    </div>
  );
};

export default Billboard;

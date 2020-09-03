import React from 'react';
import styled from 'styled-components';
import { Table } from 'semantic-ui-react';

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
      <Table style={{ marginBottom: '30px', maxWidth: '800px' }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center" style={{ fontSize: '1.6rem' }}>
              {''}
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" style={{ fontSize: '1.6rem' }}>
              Nickname
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" style={{ fontSize: '1.6rem' }}>
              Score
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rankings.map((ranking, idx) => (
            <Table.Row key={ranking.nickname}>
              <Table.Cell textAlign="right" verticalAlign="middle" width={2}>
                {idx + 1}
              </Table.Cell>
              <Table.Cell
                style={{ fontSize: '1.2rem' }}
                verticalAlign="middle"
                textAlign="center"
                width={6}
              >
                {ranking.nickname}
              </Table.Cell>
              <Table.Cell verticalAlign="middle" textAlign="center" width={6}>
                {ranking.score}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export const Billboard = styled(BillboardPlain)``;

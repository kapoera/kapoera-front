import React from 'react';
import { useIntl } from 'react-intl';
import { Divider, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

const HeaderContainer = styled.div``;

const SegmentHeader = styled.div`
  align-items: center;
  display: flex;
  font-size: calc(1rem + 2vmin);
  justify-content: center;
  line-height: normal;
`;

enum RecordWinner {
  KAIST = 'KAIST',
  POSTECH = 'POSTECH'
}

export interface GameRecordProps {
  records: { score: [number, number]; winner: RecordWinner; year: number }[];
}

export const GameRecord: React.FC<GameRecordProps> = ({
  records
}: GameRecordProps) => {
  const { formatMessage: f } = useIntl();

  return (
    <Segment style={{ padding: '14px 30px' }}>
      <HeaderContainer>
        <SegmentHeader>{f({ id: 'record.headtohead' })}</SegmentHeader>
      </HeaderContainer>
      <Divider style={{ margin: '7px 20px 20px' }} />
      <div
        style={{
          fontSize: 'calc(0.8rem + 1vmin)'
        }}
      >
        {records.map(({ year, score, winner }) => (
          <div key={year} style={{ display: 'flex', marginTop: '15px' }}>
            <div
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 'calc(0.9rem + 1.1vmin)'
              }}
            >
              {year}
            </div>
            <div
              style={{ flex: 1, textAlign: 'center', fontWeight: 'lighter' }}
            >
              {`${score[0]} : ${score[1]}`}
            </div>
            <div
              style={{
                flex: 1,
                textAlign: 'center',
                color: winner === RecordWinner.KAIST ? '#2185d0' : '#db2828'
              }}
            >
              {f({ id: 'record.result' }, { winner })}
            </div>
          </div>
        ))}
      </div>
    </Segment>
  );
};

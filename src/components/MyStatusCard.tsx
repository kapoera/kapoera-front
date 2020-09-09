import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Button, Icon, Segment, Statistic } from 'semantic-ui-react';
import styled from 'styled-components';
import { ordinalSuffix } from '@/utils/commons';

interface FlexBoxProps {
  wrap?: number;
}

const FlexBox = styled.div`
  display: flex;
  justify-content: space-around;
  ${({ wrap }: FlexBoxProps) => wrap === 1 && 'flex-wrap: wrap;'}
`;

const FullSegment = styled(Segment)`
  height: 100%;
  width: 100%;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const UserHeader = styled.div`
  font-size: 2.4rem;
  line-height: 1.4;
  margin-left: 10px;
  margin-top: 10px;
  text-align: center;
`;

const SuffixSpan = styled.span`
  font-family: inherit;
  font-size: 1.3rem;
  text-transform: lowercase;
`;

interface MyStatusCardProps {
  score: number;
  ranking: number;
  nickname: string;
  isLoggedIn: boolean;
}

const MyStatusCard: React.FC<MyStatusCardProps> = ({
  score,
  isLoggedIn,
  nickname,
  ranking
}: MyStatusCardProps) => {
  const history = useHistory();
  const { formatMessage: f } = useIntl();

  return isLoggedIn ? (
    <FullSegment>
      <UserContainer>
        <UserHeader>{f({ id: 'mystatus.header' }, { nickname })}</UserHeader>
        <FlexBox wrap={1} style={{ flex: 1 }}>
          <FlexBox style={{ alignItems: 'center' }}>
            <Statistic color="red">
              <Statistic.Value>
                {score}
                <SuffixSpan>pts</SuffixSpan>
              </Statistic.Value>
              <Statistic.Label style={{ color: '#db2828' }}>
                {f({ id: 'billboard.score' })}
              </Statistic.Label>
            </Statistic>
          </FlexBox>
          <FlexBox style={{ alignItems: 'center' }}>
            <Statistic>
              <Statistic.Value>
                {ranking}
                <SuffixSpan>{ordinalSuffix(ranking)}</SuffixSpan>
              </Statistic.Value>
              <Statistic.Label>{f({ id: 'mystatus.placing' })}</Statistic.Label>
            </Statistic>
          </FlexBox>
        </FlexBox>
      </UserContainer>
    </FullSegment>
  ) : (
    <FullSegment placeholder={true}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Button
          primary
          style={{ marginBottom: '15px' }}
          onClick={() => history.push('/signin/redirect')}
        >
          <Icon name="key" /> SSO Sign in
        </Button>
        <div
          style={{
            fontSize: '1.2rem',
            textAlign: 'center'
          }}
        >
          {f({ id: 'mystatus.signin_message' })}
        </div>
      </div>
    </FullSegment>
  );
};

export default MyStatusCard;

import React from 'react';
import { useIntl } from 'react-intl';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';
import LibraryImage from '@/public/library_banner.png';

const DimmedImage = styled(Image)`
  border-radius: 35px;
  min-height: 140px;
  opacity: 0.5;
`;

const Overlay = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 35px;
  color: #fafafa;
  display: flex;
  flex-wrap: wrap;
  font-size: calc(2rem + 1.5vmin);
  height: 100%;
  justify-content: center;
  left: 0;
  min-height: 140px;
  padding: 0 5px;
  position: absolute;
  top: 0;
  white-space: pre-line;
  width: 100%;
`;

const StatusBanner: React.FC = () => {
  const { formatMessage: f } = useIntl();
  const firstDay = new Date('2020-09-17T15:00:00Z').getTime();
  const secondDay = new Date('2020-09-18T15:00:00Z').getTime();
  const currentTime = Date.now();
  const day = currentTime > secondDay ? 2 : (secondDay >= currentTime && currentTime > firstDay) ? 1 : 0;

  return (
    <div
      style={{
        position: 'relative',
        marginBottom: '15px',
        marginTop: '20px'
      }}
    >
      <DimmedImage fluid src={LibraryImage} alt="Library Image" />
      <Overlay>
        <div>{f({ id: 'statusbanner.kapo' })}&nbsp;</div>
        <div>
          {f({ id: 'statusbanner.science_war' })}
          <span style={{ color: 'tomato' }}>
            &nbsp;{f({ id: 'statusbanner.day' }, { day: day })}&nbsp;
          </span>
        </div>
      </Overlay>
    </div>
  );
};

export default StatusBanner;

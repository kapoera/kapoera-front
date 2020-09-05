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
  position: absolute;
  top: 0;
  white-space: pre-line;
  width: 100%;
`;

const StatusBanner: React.FC = () => {
  const { formatMessage: f } = useIntl();

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
            &nbsp;{f({ id: 'statusbanner.day' }, { day: 1 })}&nbsp;
          </span>
        </div>
      </Overlay>
    </div>
  );
};

export default StatusBanner;

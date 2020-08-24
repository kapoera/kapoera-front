import React from 'react';
import styled from 'styled-components';
import LibraryImage from '@/public/library_banner.png';
import { Image } from 'semantic-ui-react';

const DimmedImage = styled(Image)`
  opacity: 0.5;
`;

const Overlay = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fafafa;
  display: flex;
  font-size: 3rem;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const StatusBanner: React.FC = () => {
  return (
    <div style={{ position: 'relative', marginBottom: '15px' }}>
      <DimmedImage fluid src={LibraryImage} alt="Library Image" />
      <Overlay>
        카이스트-포스텍 대제전
        <span style={{ color: 'tomato' }}>&nbsp;1일&nbsp;</span> 차
      </Overlay>
    </div>
  );
};

export default StatusBanner;

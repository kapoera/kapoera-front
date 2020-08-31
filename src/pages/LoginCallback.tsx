import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Header, Modal } from 'semantic-ui-react';

interface NicknameUpdateModalProps {
  defaultNickname: string;
}

const NicknameUpdateModal: React.FC<NicknameUpdateModalProps> = ({
  defaultNickname
}: NicknameUpdateModalProps) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Header as="h1">Welcome, {defaultNickname}</Header>
      <Modal.Content>
        <div style={{ fontSize: '1.5rem' }}>
          To change the default nickname given to you, visit the profile page.
          Note that nicknames are publicly exposed in this service.
        </div>
      </Modal.Content>
    </Modal>
  );
};

const LoginCallback: React.FC = () => {
  const { search } = useLocation();
  const [isNew, nickname] = search
    .substring(1)
    .split('&')
    .map(q => q.split('=')[1]);

  // intentional double equal sign!
  return isNew == 'true' ? (
    <div>
      <NicknameUpdateModal defaultNickname={nickname} />
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default LoginCallback;

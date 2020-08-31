import React, { useState } from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { Button, Header, Modal } from 'semantic-ui-react';

interface NicknameUpdateModalProps {
  defaultNickname: string;
}

const NicknameUpdateModal: React.FC<NicknameUpdateModalProps> = ({
  defaultNickname
}: NicknameUpdateModalProps) => {
  const history = useHistory();

  return (
    <Modal open={true}>
      <Header as="h1">Welcome, {defaultNickname}</Header>
      <Modal.Content>
        <div style={{ fontSize: '1.5rem' }}>
          To change the default nickname given to you, visit the profile page.
          Note that nicknames are publicly exposed in this service.
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="To Main Page"
          labelPosition="right"
          icon="checkmark"
          onClick={() => {
            history.push('/');
          }}
          positive
        />
      </Modal.Actions>
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

import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { GlobalContext, Actions } from '@/context';

interface NicknameUpdateModalProps {
  defaultNickname: string;
}

const IconButton = styled(Button)`
  background: transparent !important;
  padding: 5px 10px !important;
`;

const NicknameUpdateModal: React.FC<NicknameUpdateModalProps> = ({
  defaultNickname
}: NicknameUpdateModalProps) => {
  const history = useHistory();
  const { formatMessage: f } = useIntl();
  const { dispatch } = useContext(GlobalContext);

  return (
    <Modal open={true}>
      <Header
        as="div"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <h1 style={{ margin: 0 }}>
          {f({ id: 'nicknamemodal.header' }, { nickname: defaultNickname })}
        </h1>
        <IconButton
          icon
          onClick={() => dispatch({ type: Actions.ToggleLocale })}
        >
          <Icon color="black" name="language" />
        </IconButton>
      </Header>
      <Modal.Content>
        <div style={{ fontSize: '1.5rem' }}>
          {f({ id: 'nicknamemodal.content' })}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content={f({ id: 'nicknamemodal.button' })}
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

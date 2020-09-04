import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { GlobalContext } from '@/context';

const MyStatusCard: React.FC = () => {
  const history = useHistory();
  const { formatMessage: f } = useIntl();
  const {
    state: { isLoggedIn }
  } = useContext(GlobalContext);

  return isLoggedIn ? (
    <div>hello</div>
  ) : (
    <Segment placeholder style={{ height: '100%', width: '100%' }}>
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
    </Segment>
  );
};

export default MyStatusCard;

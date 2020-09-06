import React, { useContext, useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import {
  ButtonGroup,
  Dropdown,
  Icon,
  Menu,
  Transition
} from 'semantic-ui-react';
import styled from 'styled-components';
import { GlobalContext, Actions } from '@/context';
import axios from '@/utils/axios';
import config from '@/config';

interface NavBarProps {
  className?: string;
}

const ProfileIcon = styled(Icon)`
  margin: 0 !important;
`;

const StyledMenu = styled(Menu)`
  background-color: ${config.primary} !important;
  margin-bottom: 0 !important;
`;

const StyledDropdown = styled(Dropdown)`
  background-color: ${config.primary} !important;
  color: rgba(255, 255, 255, 0.7) !important;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08) !important;
    color: #fff !important;
  }
`;

const NavBar: React.FC<NavBarProps> = ({ className }: NavBarProps) => {
  const { formatMessage: f } = useIntl();
  const history = useHistory();
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const {
    state: { isLoggedIn },
    dispatch
  } = useContext(GlobalContext);

  const handleLogout = async () => {
    dispatch({ type: Actions.Logout });
    await axios.post('/auth/logout');
    history.push('/');
  };

  return (
    <StyledMenu className={className} color="grey" inverted secondary>
      <Menu.Item onClick={() => history.push('/')}>
        <h3>{f({ id: 'home' })}</h3>
      </Menu.Item>
      <Menu.Item onClick={() => history.push('/admin')}>
        <h3>admin</h3>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item onClick={() => dispatch({ type: Actions.ToggleLocale })}>
          <Icon name="language" size="large" style={{ margin: 0 }} />
        </Menu.Item>
        {isLoggedIn ? (
          <ButtonGroup>
            <StyledDropdown
              icon={<ProfileIcon name="user circle" size="large" />}
              button
              className="icon"
              onClick={() => setProfileOpen(prevState => !prevState)}
            >
              <Transition
                visible={profileOpen}
                animation="scale"
                duration={500}
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    text={f({ id: 'logout' })}
                    onClick={handleLogout}
                  />
                  <Dropdown.Item
                    text={f({ id: 'profile' })}
                    onClick={() => history.push('/profile')}
                  />
                </Dropdown.Menu>
              </Transition>
            </StyledDropdown>
          </ButtonGroup>
        ) : (
            <Menu.Item
              onClick={() => {
                history.push('/signin/redirect');
              }}
            >
              <h3>{f({ id: 'login' })}</h3>
            </Menu.Item>
          )}
      </Menu.Menu>
    </StyledMenu>
  );
};

export default styled(NavBar)`
  padding: 5px 20px !important;
`;

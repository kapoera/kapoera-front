import React, { useContext, useState } from 'react';
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
import * as AuthUtils from '@/utils/auth';

interface NavBarProps {
  className?: string;
}

const ProfileIcon = styled(Icon)`
  margin: 0 !important;
`;

const NavBar: React.FC<NavBarProps> = ({ className }: NavBarProps) => {
  const history = useHistory();
  const [activeItem, setActiveItem] = useState<string>('home');
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const {
    state: { isLoggedIn },
    dispatch
  } = useContext(GlobalContext);

  const handleLogClick = () => {
    if (isLoggedIn) {
      dispatch({ type: Actions.Logout });
      AuthUtils.logout();
    }
    history.push('/login');
  };

  const handleProfileClick = () => {
    history.push('/profile');
  };

  return (
    <Menu className={className} color="blue" inverted secondary>
      <Menu.Item name="home" onClick={() => history.push('/')} />
      <Menu.Menu position="right">
        <ButtonGroup color="blue">
          <Dropdown
            icon={<ProfileIcon name="user circle" size="large" />}
            button
            className="icon"
            onClick={() => setProfileOpen(prevState => !prevState)}
          >
            <Transition visible={profileOpen} animation="scale" duration={500}>
              <Dropdown.Menu>
                <Dropdown.Item
                  text={isLoggedIn ? 'logout' : 'login'}
                  onClick={handleLogClick}
                />
                {isLoggedIn && (
                  <Dropdown.Item text="profile" onClick={handleProfileClick} />
                )}
              </Dropdown.Menu>
            </Transition>
          </Dropdown>
        </ButtonGroup>
      </Menu.Menu>
    </Menu>
  );
};

export default styled(NavBar)`
  padding: 5px 20px !important;
`;

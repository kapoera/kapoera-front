import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import { GlobalContext, Actions } from '@/context';

interface NavBarProps {
  className?: string;
}

const NavBar: React.FC<NavBarProps> = ({ className }: NavBarProps) => {
  const history = useHistory();
  const [activeItem, setActiveItem] = useState('home');
  const { state, dispatch } = useContext(GlobalContext);

  const handleProfileClick = () => {
    if (state.isLoggedIn) dispatch({ type: Actions.Logout });

    history.push('/login');
  };

  return (
    <Menu className={className} color="blue" inverted secondary>
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={() => setActiveItem('home')}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name={state.isLoggedIn ? 'logout' : 'login'}
          onClick={handleProfileClick}
        />
      </Menu.Menu>
    </Menu>
  );
};

export default styled(NavBar)`
  padding: 5px 20px !important;
`;

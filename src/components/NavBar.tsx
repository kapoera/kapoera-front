import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';

interface NavBarProps {
  className: string;
}

const NavBar: React.FC<NavBarProps> = ({ className }: NavBarProps) => {
  const history = useHistory();
  const [activeItem, setActiveItem] = useState('home');

  return (
    <Menu className={className} color="blue" inverted secondary>
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={() => setActiveItem('home')}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={() => {
            setActiveItem('login');
            history.push('/login');
          }}
        />
      </Menu.Menu>
    </Menu>
  );
};

export default styled(NavBar)`
  padding: 5px 20px !important;
`;

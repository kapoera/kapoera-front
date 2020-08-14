import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';

const NavBar: React.FC = () => {
  const history = useHistory();
  const [activeItem, setActiveItem] = useState('home');

  return (
    <Menu color="blue" inverted secondary>
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

export default styled(NavBar)``;

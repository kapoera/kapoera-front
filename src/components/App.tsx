import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import NavBar from './NavBar';
import LoginPage from './LoginPage';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ebebeb;
  }
`;

const Foo: React.FC = () => <div>FooFooFooFooFooFoo</div>;

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Foo />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </BrowserRouter>
  </>
);

export default styled(App)`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

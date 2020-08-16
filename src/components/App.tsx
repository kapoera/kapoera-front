import React, { useEffect, useReducer } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import {
  GlobalContext,
  globalContextReducer as reducer,
  Actions,
  initialState
} from '@/context';
import NavBar from './NavBar';
import LoginPage from './LoginPage';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ebebeb;
  }
`;

const Foo: React.FC = () => <div>FooFooFooFooFooFoo</div>;

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setTimeout(() => dispatch({ type: Actions.Login }), 1000);
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
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
    </GlobalContext.Provider>
  );
};

export default App;

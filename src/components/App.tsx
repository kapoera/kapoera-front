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
import axios from '@/utils/axios';
import NavBar from './NavBar';
import LoginPage from './LoginPage';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ebebeb;
  }
`;

const Foo: React.FC = () => <div>FooFooFooFooFooFoo</div>;

interface CheckStatusResponse {
  valid: boolean;
  decoded?: {
    username: string;
    nickname: string;
  };
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchStatus = async () => {
      const { data }: { data: CheckStatusResponse } = await axios.get(
        '/auth/check'
      );

      if (data.valid) {
        dispatch({ type: Actions.SetInfo, payload: data.decoded });
      } else {
        localStorage.removeItem('kapoera-token');
        dispatch({ type: Actions.Logout });
      }
    };

    fetchStatus();
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

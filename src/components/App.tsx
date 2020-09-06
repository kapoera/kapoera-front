import React, { useEffect, useReducer } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { IntlProvider } from 'react-intl';
import {
  GlobalContext,
  globalContextReducer as reducer,
  Actions,
  initialState,
  User
} from '@/context';
import translations from '@/i18n';
import { Game, LoginCallback, LoginRedirect, Main, Profile } from '@/pages';
import axios from '@/utils/axios';
import NavBar from './NavBar';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fafafa;
    overflow-x: hidden;
  }
  body * {
    font-family: Jua, sans-serif;
  }
`;

interface CheckStatusResponse {
  success: boolean;
  userinfo?: User;
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { data }: { data: CheckStatusResponse } = await axios.get(
          '/api/private/check'
        );

        if (data.success) {
          dispatch({ type: Actions.Login, payload: data.userinfo });
        } else {
          dispatch({ type: Actions.Logout });
        }
      } catch (error) {
        console.error('Kapoera: Not Logged In');
      }
    };

    fetchStatus();
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <IntlProvider locale={state.locale} messages={translations[state.locale]}>
        <GlobalStyle />
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/signin/callback">
              <LoginCallback />
            </Route>
            <Route path="/signin/redirect">
              <LoginRedirect />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/game/:gameId">
              <Game />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </BrowserRouter>
      </IntlProvider>
    </GlobalContext.Provider>
  );
};

export default App;

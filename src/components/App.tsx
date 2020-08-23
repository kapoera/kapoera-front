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
import { Login, Main, Profile } from '@/pages';
import translations from '@/i18n';
import * as AuthUtils from '@/utils/auth';
import axios from '@/utils/axios';
import NavBar from './NavBar';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fafafa;
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
          '/api/check'
        );

        if (data.success) {
          dispatch({ type: Actions.Login });
          dispatch({ type: Actions.SetInfo, payload: data.userinfo });
        } else {
          AuthUtils.logout();
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
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
        </BrowserRouter>
      </IntlProvider>
    </GlobalContext.Provider>
  );
};

export default App;

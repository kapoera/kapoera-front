import React from 'react';

export interface GlobalContextI {
  loggedIn: boolean;
}

export const defaultState: GlobalContextI = {
  loggedIn: false
};

export const GlobalContext = React.createContext(defaultState);

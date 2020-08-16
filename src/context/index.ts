import React, { Dispatch } from 'react';

interface GlobalState {
  isLoggedIn: boolean;
}

export enum Actions {
  Login = 'LOGIN'
}

interface GlobalAction {
  type: Actions;
}

export const initialState: GlobalState = {
  isLoggedIn: false
};

export const GlobalContext = React.createContext<{
  state: GlobalState;
  dispatch: Dispatch<GlobalAction>;
}>(null);

export const globalContextReducer = (
  state: GlobalState,
  action: GlobalAction
): GlobalState => {
  switch (action.type) {
    case Actions.Login:
      return { ...state, isLoggedIn: true };
    default:
      return state;
  }
};

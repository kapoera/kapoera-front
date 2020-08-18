import React, { Dispatch } from 'react';

interface GlobalState {
  isLoggedIn: boolean;
  user: {
    username: string;
    nickname: string;
  };
}

export enum Actions {
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  SetInfo = 'SET_INFO',
  UpdateNickname = 'UPDATE_NICKNAME'
}

interface LoginAction {
  type: typeof Actions.Login;
}

interface LogoutAction {
  type: typeof Actions.Logout;
}

interface SetInfoAction {
  type: typeof Actions.SetInfo;
  payload: {
    username: string;
    nickname: string;
  };
}

interface UpdateNickname {
  type: typeof Actions.UpdateNickname;
  payload: string;
}

type GlobalAction = LoginAction | LogoutAction | SetInfoAction | UpdateNickname;

export const initialState: GlobalState = {
  isLoggedIn: false,
  user: { username: '', nickname: '' }
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
    case Actions.Logout:
      return { ...state, isLoggedIn: false };
    case Actions.SetInfo:
      return { ...state, user: action.payload };
    case Actions.UpdateNickname:
      return { ...state, user: { ...state.user, nickname: action.payload } };
    default:
      return state;
  }
};

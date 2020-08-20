import React, { Dispatch } from 'react';

interface GlobalState {
  isLoggedIn: boolean;
  user: User;
  locale: string;
}

export interface User {
  department: string;
  is_admin: boolean;
  nickname: string;
  password: string;
  score: number;
  student_number: number;
  username: string;
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
  payload: User;
}

interface UpdateNickname {
  type: typeof Actions.UpdateNickname;
  payload: string;
}

type GlobalAction = LoginAction | LogoutAction | SetInfoAction | UpdateNickname;

export const initialState: GlobalState = {
  isLoggedIn: false,
  user: null,
  locale: 'ko'
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
      return { ...state, isLoggedIn: false, user: null };
    case Actions.SetInfo:
      return { ...state, user: action.payload };
    case Actions.UpdateNickname:
      return { ...state, user: { ...state.user, nickname: action.payload } };
    default:
      return state;
  }
};

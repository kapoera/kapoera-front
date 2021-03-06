import React, { Dispatch } from 'react';

interface GlobalState {
  isLoggedIn: boolean;
  user: User;
  locale: string;
  isAdmin: boolean;
}

export interface User {
  _id: string;
  ku_std_no: string;
  uid: string;
  kaist_uid: string;
  mail: string;
  givenname: string;
  mobile: string;
  ku_kname: string;
  sn: string;
  score: number;
  is_admin: boolean;
  nickname: string;
}

export enum Actions {
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  UpdateNickname = 'UPDATE_NICKNAME',
  ToggleLocale = 'TOGGLE_LOCALE',
  Admin = 'ADMIN'
}

interface LoginAction {
  type: typeof Actions.Login;
  payload: User;
}

interface LogoutAction {
  type: typeof Actions.Logout;
}

interface UpdateNickname {
  type: typeof Actions.UpdateNickname;
  payload: string;
}

interface ToggleLocale {
  type: typeof Actions.ToggleLocale;
}

interface AdminAction {
  type: typeof Actions.Admin;
}

type GlobalAction =
  | LoginAction
  | LogoutAction
  | UpdateNickname
  | ToggleLocale
  | AdminAction;

export const initialState: GlobalState = {
  isLoggedIn: false,
  user: null,
  locale: 'ko',
  isAdmin: false
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
      return { ...state, isLoggedIn: true, user: action.payload };
    case Actions.Logout:
      return { ...state, isLoggedIn: false, user: null, isAdmin: false };
    case Actions.UpdateNickname:
      return { ...state, user: { ...state.user, nickname: action.payload } };
    case Actions.ToggleLocale:
      return { ...state, locale: state.locale === 'ko' ? 'en' : 'ko' };
    case Actions.Admin:
      return { ...state, isAdmin: true };
    default:
      return state;
  }
};

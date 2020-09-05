import React, { Dispatch } from 'react';

interface GlobalState {
  isLoggedIn: boolean;
  user: User;
  locale: string;
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
  SetInfo = 'SET_INFO',
  UpdateNickname = 'UPDATE_NICKNAME',
  ToggleLocale = 'TOGGLE_LOCALE'
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

interface ToggleLocale {
  type: typeof Actions.ToggleLocale;
}

type GlobalAction =
  | LoginAction
  | LogoutAction
  | SetInfoAction
  | UpdateNickname
  | ToggleLocale;

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
    case Actions.ToggleLocale:
      return { ...state, locale: state.locale === 'ko' ? 'en' : 'ko' };
    default:
      return state;
  }
};

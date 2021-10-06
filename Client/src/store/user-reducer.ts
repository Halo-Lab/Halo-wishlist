import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import AuthRequest from '../api/request/AuthRequest';
import { IUser } from './../models/IUser';

export type UserStateType = {
  isLoggedIn: boolean;
  user: IUser;
};

const initialState: UserStateType = {
  isLoggedIn: false,
  user: { email: '', isActivated: false, id: '' },
};

const slice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserAC(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
  },
});

export const loginUser =
  (password: string, email: string) => (dispatch: Dispatch) => {
    AuthRequest.login(password, email)
      .then((res) => {
        localStorage.setItem('token', res.data.accessToken);
        dispatch(setUserAC(res.data.user));
      })
      .catch((e) => console.log(e.response?.data?.message));
  };

export const registrationUser =
  (password: string, email: string) => (dispatch: Dispatch) => {
    AuthRequest.registration(password, email)
      .then((res) => {
        localStorage.setItem('token', res.data.accessToken);
        dispatch(setUserAC(res.data.user));
      })
      .catch((e) => console.log(e.response?.data?.message));
  };

export const userReducer = slice.reducer;
export const { setUserAC } = slice.actions;

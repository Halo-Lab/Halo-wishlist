import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dispatch } from 'redux';

import { API_URL } from '../api';
import AuthRequest from '../api/request/AuthRequest';
import UserRequest from '../api/request/UserRequest';
import { IUser } from '../models/IUser';
import { AuthResponse } from '../models/response/AuthResponse';
import * as notify from '../utils/notifications';
import { IInitialValues } from './../scenes/ProfileSettings/common-types.d';

export type UserStateType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: IUser;
};

const initialState: UserStateType = {
  isLoggedIn: false,
  isLoading: true,
  user: {
    email: '',
    isActivated: false,
    id: '',
    name: '',
    bio: '',
    date: '',
    nickName: '',
    facebook: '',
    instagram: '',
    twitter: '',
    userPic: '',
    wishlist: [],
  },
};

const slice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserAC(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setIsLoggedInAC(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setLoadingAc(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const loginUser =
  (password: string, email: string, remember: boolean) => (dispatch: Dispatch) => {
    AuthRequest.login(password, email, remember)
      .then((res) => {
        localStorage.setItem('token', res.data.accessToken);
        dispatch(setIsLoggedInAC(true));
        dispatch(setUserAC(res.data.user));
      })
      .catch((e) => notify.error(e.response?.data?.message));
  };

export const registrationUser =
  (password: string, email: string) => (dispatch: Dispatch) => {
    AuthRequest.registration(password, email)
      .then((res) => {
        localStorage.setItem('token', res.data.accessToken);
        dispatch(setIsLoggedInAC(true));
        dispatch(setUserAC(res.data.user));
      })
      .catch((e) => notify.error(e.response?.data?.message));
  };

export const logoutUser = () => (dispatch: Dispatch) => {
  AuthRequest.logout()
    .then(() => {
      localStorage.removeItem('token');
      dispatch(setIsLoggedInAC(false));
      dispatch(setUserAC({} as IUser));
    })
    .catch((e) => console.log(e.response?.data?.message));
};

export const checkUserLogin = () => async (dispatch: Dispatch) => {
  dispatch(setLoadingAc(true));
  try {
    const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem('token', response.data.accessToken);
    dispatch(setIsLoggedInAC(true));
    dispatch(setUserAC(response.data.user));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoadingAc(false));
  }
};

export const updateUserPic = (userPic: string) => (dispatch: Dispatch) => {
  UserRequest.updateUserPic(userPic)
    .then((res) => {
      dispatch(setUserAC(res.data.user));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const updateUser = (userData: IInitialValues) => (dispatch: Dispatch) => {
  UserRequest.updateUSerProfile(userData)
    .then((res) => {
      dispatch(setUserAC(res.data.user));
    })
    .then(() => notify.successes('User update!'))
    .catch((e) => {
      notify.error(e.response.data.message);
    });
};

export const userReducer = slice.reducer;
export const { setUserAC, setIsLoggedInAC, setLoadingAc } = slice.actions;

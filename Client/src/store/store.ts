import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { userReducer } from './user-reducer';

const rootReducer = combineReducers({
  users: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
export type RootReducerType = typeof rootReducer;
export type AppRootStateType = ReturnType<RootReducerType>;

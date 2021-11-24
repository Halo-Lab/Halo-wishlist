import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { userReducer } from './user-reducer';
import { wishlistReducer } from './wishlist-reducer';

const rootReducer = combineReducers({
  users: userReducer,
  wishlist: wishlistReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
export type RootReducerType = typeof rootReducer;
export type AppRootStateType = ReturnType<RootReducerType>;

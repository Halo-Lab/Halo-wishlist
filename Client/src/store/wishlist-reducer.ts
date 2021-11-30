import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { Dispatch } from 'redux';

import WishlistRequest from '../api/request/WishlistRequest';
import { IWishlist } from '../models/IWishlist';
import * as notify from '../utils/notifications';

export type WishlistStateType = {
  wishlists: IWishlist[];
};

const initialState: WishlistStateType = {
  wishlists: [],
};

const slice = createSlice({
  name: 'wishlist',
  initialState: initialState,
  reducers: {
    setWishlistAC(state, action: PayloadAction<IWishlist[]>) {
      state.wishlists = action.payload;
    },

    addWishlistAC(state, action: PayloadAction<{ wishlist: IWishlist }>) {
      state.wishlists.push(action.payload.wishlist);
    },
  },
});

export const setWishlists = (userId: string) => (dispatch: Dispatch) => {
  WishlistRequest.getWishlists(userId)
    .then((res) => {
      dispatch(setWishlistAC(res.data));
    })
    .catch((e) => console.log(e.response?.data?.message));
};

export const addWishlist = (title: string) => (dispatch: Dispatch) => {
  WishlistRequest.addWishlists(title)
    .then((res) => {
      dispatch(addWishlistAC(res.data));
    })
    .then(() => {
      notify.successes(i18n.t('modal.created'));
    })
    .catch((e) => {
      notify.error(e.response?.data?.message);
    });
};

export const wishlistReducer = slice.reducer;
export const { setWishlistAC, addWishlistAC } = slice.actions;

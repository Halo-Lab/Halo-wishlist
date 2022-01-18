import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { Dispatch } from 'redux';

import WishlistRequest from '../api/request/WishlistRequest';
import { IProduct } from '../models/IProduct';
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

    deleteWishlistAC(state, action: PayloadAction<{ wishlistId: string }>) {
      const index = state.wishlists.findIndex(
        (w) => w._id === action.payload.wishlistId,
      );
      if (index > -1) {
        state.wishlists.splice(index, 1);
      }
    },

    addWishAC(
      state,
      action: PayloadAction<{
        wishlistId: string;
        newWish: IProduct;
      }>,
    ) {
      const index = state.wishlists.findIndex((w) => {
        return w._id === action.payload.wishlistId;
      });
      if (index > -1) {
        state.wishlists[index].items.push(action.payload.newWish);
      }
    },

    updateWishAC(
      state,
      action: PayloadAction<{
        wishlistId: string;
        newWish;
      }>,
    ) {
      const index = state.wishlists.findIndex((w) => {
        return w._id === action.payload.wishlistId;
      });
      if (index > -1) {
        const wishIndex = state.wishlists[index].items.findIndex((i) => {
          return i._id === action.payload.newWish._id;
        });
        if (wishIndex > -1) {
          state.wishlists[index].items[wishIndex] = action.payload.newWish;
        }
      }
    },

    deleteWishAC(
      state,
      action: PayloadAction<{ wishlistId: string; wishId: string }>,
    ) {
      const index = state.wishlists.findIndex((w) => {
        return w._id === action.payload.wishlistId;
      });
      const indexTask = state.wishlists[index]?.items.findIndex(
        (w) => w._id === action.payload.wishId,
      );
      state.wishlists[index].items.splice(indexTask, 1);
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

export const deleteWishlist = (wishlistId: string) => (dispatch: Dispatch) => {
  WishlistRequest.deleteWishlists(wishlistId)
    .then(() => {
      dispatch(deleteWishlistAC({ wishlistId }));
    })
    .then(() => {
      notify.successes(i18n.t('modal.deleted'));
    })
    .catch((e) => {
      notify.error(e.response?.data?.message);
    });
};

export const addWish =
  (wishlistId: string, url: string, nameURL: string, image: string, price: string) =>
  (dispatch: Dispatch) => {
    WishlistRequest.addWish(wishlistId, url, nameURL, image, price)
      .then((res) => {
        dispatch(addWishAC({ newWish: res.data[res.data.length - 1], wishlistId }));
      })
      .then(() => {
        notify.successes(i18n.t('modal.created'));
      })
      .catch((e) => {
        notify.error(e.response.data.message);
      });
  };

export const updateWish =
  (
    wishlistId: string,
    wish: {
      url?: string;
      nameURL?: string;
      image?: string;
      price?: string;
      _id: string;
      isReserved?: string;
      gotIt?: boolean;
    },
    hideNotify?: boolean,
  ) =>
  (dispatch: Dispatch) => {
    WishlistRequest.updateWish(wish)
      .then((res) => {
        if (res.data.status === 'ok') {
          dispatch(
            updateWishAC({
              wishlistId,
              newWish: wish,
            }),
          );
        }
      })
      .then(() => {
        if (!hideNotify) notify.successes(i18n.t('modal.edited'));
      })
      .catch((e) => {
        notify.error(e.response.data.message);
      });
  };

export const deleteWish =
  (wishlistId: string, wishId: string) => (dispatch: Dispatch) => {
    WishlistRequest.deleteWish(wishId)
      .then(() => {
        dispatch(deleteWishAC({ wishlistId, wishId }));
      })
      .then(() => {
        notify.successes(i18n.t('modal.deleted'));
      })
      .catch((e) => {
        notify.error(e.response?.data?.message);
      });
  };

export const wishlistReducer = slice.reducer;
export const {
  setWishlistAC,
  addWishlistAC,
  deleteWishlistAC,
  addWishAC,
  updateWishAC,
  deleteWishAC,
} = slice.actions;

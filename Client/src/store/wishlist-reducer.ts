import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { Dispatch } from 'redux';

import WishlistRequest from '../api/request/WishlistRequest';
import { IWishlist } from '../models/IWishlist';
import * as notify from '../utils/notifications';
import { IProduct } from './../models/IProduct';

export type WishlistStateType = {
  wishlists: IWishlist[];
  archive: IProduct[];
  isLoading: boolean;
};

const initialState: WishlistStateType = {
  wishlists: [],
  archive: [],
  isLoading: false,
};

const slice = createSlice({
  name: 'wishlist',
  initialState: initialState,
  reducers: {
    isLoadingAC(state) {
      state.isLoading = !state.isLoading;
    },

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

    setArchiveWishesAC(state, action: PayloadAction<IProduct[]>) {
      state.archive = action.payload;
    },

    deleteArchiveWishAC(state, action: PayloadAction<string | number>) {
      state.archive = state.archive.filter((item) => item._id !== action.payload);
    },

    archiveWishAC(
      state,
      action: PayloadAction<{ wishlistId: string; wishId: string }>,
    ) {
      const index = state.wishlists.findIndex((w) => {
        return w._id === action.payload.wishlistId;
      });
      const indexTask = state.wishlists[index]?.items.findIndex(
        (w) => w._id === action.payload.wishId,
      );
      state.archive.push(state.wishlists[index].items[indexTask]);
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

export const archiveWish =
  (wish: IProduct, wishlistId: string) => (dispatch: Dispatch) => {
    WishlistRequest.archiveWish(wishlistId, wish)
      .then(() => {
        dispatch(archiveWishAC({ wishlistId, wishId: wish._id }));
      })
      .then(() => {
        notify.successes(i18n.t('modal.addedToArchive'));
      })
      .catch((e) => {
        notify.error(e.response?.data?.message);
      });
  };

export const loadArchiveWishes = () => (dispatch: Dispatch) => {
  dispatch(isLoadingAC());
  WishlistRequest.getArchiveWishes()
    .then((res) => dispatch(setArchiveWishesAC(res.data)))
    .catch((e) => notify.error(e.response?.data?.message))
    .finally(() => dispatch(isLoadingAC()));
};

export const deleteArchiveWish = (id) => (dispatch: Dispatch) => {
  WishlistRequest.deleteArchiveWishes(id)
    .then((res) => {
      if (res.status === 200) {
        dispatch(deleteArchiveWishAC(id));
        notify.successes(res.data.message);
      }
    })
    .catch((e) => notify.error(e.response.data.message));
};

export const restoreArchiveWishes =
  (wishId: string, wishlistId: string, wish: IProduct) => (dispatch: Dispatch) => {
    WishlistRequest.restoreArchiveWishes(wishId, wishlistId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(deleteArchiveWishAC(wishId));
          dispatch(addWishAC({ wishlistId, newWish: wish }));
          notify.successes(res.data.message);
        }
      })
      .catch((e) => notify.error(e.response.data.message));
  };

export const wishlistReducer = slice.reducer;
export const {
  isLoadingAC,
  setWishlistAC,
  addWishlistAC,
  deleteWishlistAC,
  addWishAC,
  updateWishAC,
  deleteWishAC,
  archiveWishAC,
  setArchiveWishesAC,
  deleteArchiveWishAC,
} = slice.actions;

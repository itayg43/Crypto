import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {ReducerStatus} from '../../enums/ReducerStatus';
import {Coin} from '../../entities/Coin';
import {CoinsSort} from '../../enums/CoinsSort';

interface CoinEntities {
  [s: string]: Coin;
}

interface CoinsState {
  status: ReducerStatus;
  message: string;
  entities: CoinEntities;
  searchQuery: string;
  sortBy: CoinsSort;
}

const initialState: CoinsState = {
  status: ReducerStatus.idle,
  message: '',
  entities: {},
  searchQuery: '',
  sortBy: CoinsSort.priceDesc,
};

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    getCoins: state => {
      state.status = ReducerStatus.loading;
      state.message = '';
    },
    getCoinsSuccess: (state, action: PayloadAction<CoinEntities>) => {
      state.status = ReducerStatus.success;
      state.entities = action.payload;
    },
    getCoinsFail: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.error;
      state.message = action.payload;
    },

    updateCoinsSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    changeCoinsSortBy: (state, action: PayloadAction<CoinsSort>) => {
      state.sortBy = action.payload;
    },

    // reset state
    resetCoinsState: () => initialState,
  },
});

export const {
  getCoins,
  getCoinsSuccess,
  getCoinsFail,
  updateCoinsSearchQuery,
  changeCoinsSortBy,
  resetCoinsState,
} = coinsSlice.actions;

export default coinsSlice.reducer;

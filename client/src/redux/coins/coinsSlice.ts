import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {ReducerStatus} from '../../enums/ReducerStatus';
import {Coin} from '../../entities/Coin';

interface CoinEntities {
  [s: string]: Coin;
}

interface CoinsState {
  status: ReducerStatus;
  message: string;
  entities: CoinEntities;
  entityId: string;
  searchQuery: string;
}

const initialState: CoinsState = {
  status: ReducerStatus.idle,
  message: '',
  entities: {},
  entityId: '',
  searchQuery: '',
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

    updateEntityId: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.entityId === id) return;
      state.entityId = id;
    },

    updateSearchQuery: (staet, action: PayloadAction<string>) => {
      staet.searchQuery = action.payload;
    },
  },
});

export const {
  getCoins,
  getCoinsSuccess,
  getCoinsFail,
  updateEntityId,
  updateSearchQuery,
} = coinsSlice.actions;

export default coinsSlice.reducer;

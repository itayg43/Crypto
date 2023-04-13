import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {ReducerStatus} from '../../enums/ReducerStatus';
import {Coin} from '../../entities/Coin';

interface Entities {
  [s: string]: Coin;
}

interface CoinsState {
  status: ReducerStatus;
  message: string;
  entities: Entities;
  selectedEntityId: string;
}

const initialState: CoinsState = {
  status: ReducerStatus.idle,
  message: '',
  entities: {},
  selectedEntityId: 'bitcoin',
};

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    getCoins: state => {
      state.status = ReducerStatus.loading;
      state.message = '';
    },
    getCoinsSuccess: (state, action: PayloadAction<Entities>) => {
      state.status = ReducerStatus.success;
      state.entities = action.payload;
    },
    getCoinsFail: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.error;
      state.message = action.payload;
    },

    changeSelectedCoinId: (state, action: PayloadAction<string>) => {
      if (state.selectedEntityId !== action.payload) {
        state.selectedEntityId = action.payload;
      }
    },
  },
});

export const {getCoins, getCoinsSuccess, getCoinsFail, changeSelectedCoinId} =
  coinsSlice.actions;

export default coinsSlice.reducer;

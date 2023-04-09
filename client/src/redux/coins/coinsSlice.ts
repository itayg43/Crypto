import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {Coin} from '../../entities/Coin';
import {ReducerStatus} from '../../enums/ReducerStatus';

interface CoinsState {
  status: ReducerStatus;
  message: string;
  entities: Coin[];
}

const initialState: CoinsState = {
  status: ReducerStatus.idle,
  message: '',
  entities: [],
};

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    getCoins: state => {
      state.status = ReducerStatus.loading;
      state.message = '';
    },
    getCoinsSuccess: (state, action: PayloadAction<Coin[]>) => {
      state.status = ReducerStatus.success;
      state.entities = action.payload;
    },
    getCoinsFail: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.error;
      state.message = action.payload;
    },
  },
});

export const {getCoins, getCoinsSuccess, getCoinsFail} = coinsSlice.actions;

export default coinsSlice.reducer;

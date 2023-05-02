import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {Holding} from '../../entities/Holding';
import {ReducerStatus} from '../../enums/ReducerStatus';
import {CoinsSort} from '../../enums/CoinsSort';

interface HoldingsEntities {
  [s: string]: Holding;
}

interface HoldingsState {
  status: ReducerStatus;
  message: string;
  sortBy: CoinsSort;
  entities: HoldingsEntities;
}

const initialState: HoldingsState = {
  status: ReducerStatus.idle,
  message: '',
  sortBy: CoinsSort.valueDesc,
  entities: {},
};

interface UpdateHoldingQuantitySuccessPayload {
  id: number;
  quantity: number;
}

export const holdingsSlice = createSlice({
  name: 'holdings',
  initialState,
  reducers: {
    getHoldings: state => {
      state.status = ReducerStatus.loading;
      state.message = '';
    },
    getHoldingsSuccess: (state, action: PayloadAction<HoldingsEntities>) => {
      state.status = ReducerStatus.success;
      state.entities = action.payload;
    },
    getHoldingsFail: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.error;
      state.message = action.payload;
    },

    // add
    addHolding: state => {
      state.status = ReducerStatus.loading;
      state.message = '';
    },
    addHoldingSuccess: (state, action: PayloadAction<Holding>) => {
      const holding = action.payload;
      state.status = ReducerStatus.success;
      state.entities[holding.id] = holding;
    },
    addHoldingFail: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.error;
      state.message = action.payload;
    },

    // update
    updateHoldingQuantityById: state => {
      state.status = ReducerStatus.loading;
      state.message = '';
    },
    updateHoldingQuantityByIdSuccess: (
      state,
      action: PayloadAction<UpdateHoldingQuantitySuccessPayload>,
    ) => {
      const {id, quantity} = action.payload;
      state.status = ReducerStatus.success;
      state.entities[id].updateQuantity(quantity);
    },
    updateHoldingQuantityByIdFail: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.error;
      state.message = action.payload;
    },

    // delete
    deleteHoldingById: state => {
      state.status = ReducerStatus.loading;
      state.message = '';
    },
    deleteHoldingByIdSuccess: (state, action: PayloadAction<number>) => {
      state.status = ReducerStatus.success;
      delete state.entities[action.payload];
    },
    deleteHoldingByIdFail: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.error;
      state.message = action.payload;
    },

    // change holdings sort by
    changeHoldingsSortBy: (state, action: PayloadAction<CoinsSort>) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  getHoldings,
  getHoldingsSuccess,
  getHoldingsFail,
  addHolding,
  addHoldingSuccess,
  addHoldingFail,
  updateHoldingQuantityById,
  updateHoldingQuantityByIdSuccess,
  updateHoldingQuantityByIdFail,
  deleteHoldingById,
  deleteHoldingByIdSuccess,
  deleteHoldingByIdFail,
  changeHoldingsSortBy,
} = holdingsSlice.actions;

export default holdingsSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

import {ReducerStatus} from '../../enums/ReducerStatus';

interface InitializeState {
  status: ReducerStatus;
}

const initialState: InitializeState = {
  status: ReducerStatus.idle,
};

export const initializeSlice = createSlice({
  name: 'initialize',
  initialState,
  reducers: {
    initializeData: state => {
      state.status = ReducerStatus.loading;
    },
    initializeDataFinish: state => {
      state.status = ReducerStatus.finish;
    },
  },
});

export const {initializeData, initializeDataFinish} = initializeSlice.actions;

export default initializeSlice.reducer;

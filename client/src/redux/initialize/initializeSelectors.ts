import {RootState} from '../store';

export const selectInitializeStatus = (state: RootState) =>
  state.initialize.status;

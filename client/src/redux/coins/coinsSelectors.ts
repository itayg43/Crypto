import {RootState} from '../store';

export const selectCoinsStatus = (state: RootState) => state.coins.status;
export const selectCoinsMessage = (state: RootState) => state.coins.message;
export const selectCoins = (state: RootState) => state.coins.entities;

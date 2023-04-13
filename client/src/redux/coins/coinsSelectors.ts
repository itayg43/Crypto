import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../store';

export const selectCoinsStatus = (state: RootState) => state.coins.status;
export const selectCoinsMessage = (state: RootState) => state.coins.message;

export const selectNormalizedCoins = (state: RootState) => state.coins.entities;

export const selectCoins = (state: RootState) =>
  Object.values(state.coins.entities);

export const selectSelectedEntityId = (state: RootState) =>
  state.coins.selectedEntityId;

export const selectSelectedCoin = createSelector(
  selectNormalizedCoins,
  selectSelectedEntityId,
  (coins, id) => {
    return coins[id];
  },
);

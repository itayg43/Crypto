import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../store';

export const selectCoinsStatus = (state: RootState) => state.coins.status;
export const selectCoinsMessage = (state: RootState) => state.coins.message;

export const selectNormalizedCoins = (state: RootState) => state.coins.entities;

export const selectCoins = (state: RootState) =>
  Object.values(state.coins.entities);

export const selectCoinId = (state: RootState) => state.coins.entityId;

export const selectCoin = createSelector(
  selectNormalizedCoins,
  selectCoinId,
  (coins, id) => {
    return coins[id];
  },
);

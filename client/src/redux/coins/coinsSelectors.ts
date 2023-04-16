import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../store';

export const selectCoinsStatus = (state: RootState) => state.coins.status;

export const selectCoinsMessage = (state: RootState) => state.coins.message;

export const selectCoinsEntities = (state: RootState) => state.coins.entities;

export const selectCoins = (state: RootState) =>
  Object.values(state.coins.entities);

export const selectCoinId = (state: RootState) => state.coins.entityId;

export const selectSearchQuery = (state: RootState) => state.coins.searchQuery;

export const selectFilteredCoins = createSelector(
  selectCoins,
  selectSearchQuery,
  (coins, searchQuery) => {
    return coins.filter(
      c =>
        c.name.toLowerCase().includes(searchQuery) ||
        c.symbol.toLowerCase().includes(searchQuery),
    );
  },
);

export const selectCoin = createSelector(
  selectCoinsEntities,
  selectCoinId,
  (coinEntities, coinEntityId) => {
    if (!coinEntityId) return null;
    return coinEntities[coinEntityId];
  },
);

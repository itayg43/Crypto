import AsyncStorage from '@react-native-async-storage/async-storage';

import {StoredHoldingsEntities} from '../interfaces/StoredHolding';

const holdingsStorageKey = 'user_holdings';

const setHoldings = async (entities: StoredHoldingsEntities) => {
  await AsyncStorage.setItem(holdingsStorageKey, JSON.stringify(entities));
};

const getHoldings = async (): Promise<StoredHoldingsEntities> => {
  const entities = await AsyncStorage.getItem(holdingsStorageKey);
  return entities ? JSON.parse(entities) : {};
};

export default {
  setHoldings,
  getHoldings,
};

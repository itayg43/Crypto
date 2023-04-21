import AsyncStorage from '@react-native-async-storage/async-storage';

import {StoredHolding} from '../interfaces/StoredHolding';

const holdingsStorageKey = 'user_holdings';

const setHoldings = async (storedHoldings: StoredHolding[]) => {
  await AsyncStorage.setItem(
    holdingsStorageKey,
    JSON.stringify(storedHoldings),
  );
};

const getHoldings = async (): Promise<StoredHolding[]> => {
  const storedHoldings = await AsyncStorage.getItem(holdingsStorageKey);
  return storedHoldings ? JSON.parse(storedHoldings) : [];
};

export default {
  setHoldings,
  getHoldings,
};

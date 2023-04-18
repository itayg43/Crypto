import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Holding} from '../entities/Holding';
import {StoredHolding} from '../interfaces/StoredHolding';
import {MarketAction} from '../enums/MarketAction';

const holdingsStorageKey = 'user_holdings';

const setHoldings = async (storedHoldings: StoredHolding[]) => {
  await AsyncStorage.setItem(
    holdingsStorageKey,
    JSON.stringify(storedHoldings),
  );
};

const getHoldings = async (): Promise<StoredHolding[] | null> => {
  const storedHoldings = await AsyncStorage.getItem(holdingsStorageKey);
  return storedHoldings ? JSON.parse(storedHoldings) : null;
};

const addHolding = async (holding: Holding) => {
  let storedHoldings = await getHoldings();
  if (!storedHoldings) return;
  storedHoldings.push(_.pick(holding, ['id', 'quantity']));
  await setHoldings(storedHoldings);
};

const updateHolding = async (id: string, quantity: number) => {
  let storedHoldings = await getHoldings();
  if (!storedHoldings) return;
  await setHoldings(
    storedHoldings.map(currentHolding =>
      currentHolding.id === id ? {...currentHolding, quantity} : currentHolding,
    ),
  );
};

const deleteHolding = async (id: string) => {
  let storedHoldings = await getHoldings();
  if (!storedHoldings) return;
  await setHoldings(
    storedHoldings.filter(currentHolding => currentHolding.id !== id),
  );
};

export default {
  setHoldings,
  getHoldings,
  addHolding,
  updateHolding,
  deleteHolding,
};

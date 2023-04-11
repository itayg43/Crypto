import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Holding} from '../entities/Holding';
import {HoldingJSON} from '../interfaces/HoldingJSON';

const holdingsStorageKey = 'user_holdings';

const setHoldings = async (holdings: Holding[]) => {
  const values = holdings.map(h => _.pick(h, ['id', 'quantity']));
  const valuesJSON = JSON.stringify(values);
  await AsyncStorage.setItem(holdingsStorageKey, valuesJSON);
};

const getHoldings = async (): Promise<HoldingJSON[] | null> => {
  const holdingsJSON = await AsyncStorage.getItem(holdingsStorageKey);
  return holdingsJSON ? JSON.parse(holdingsJSON) : null;
};

export default {
  setHoldings,
  getHoldings,
};

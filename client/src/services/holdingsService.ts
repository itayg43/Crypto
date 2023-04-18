import _ from 'lodash';

import {Holding} from '../entities/Holding';
import coinsService from './coinsService';
import holdingsStorage from '../storage/holdingsStorage';

const getHoldings = async () => {
  const storedHoldings = await holdingsStorage.getHoldings();
  if (!storedHoldings) {
    return [];
  }
  const ids = storedHoldings.map(i => i.id).join(',');
  const coins = await coinsService.getCoinsByIds(ids);
  return coins.map(c => {
    const quantity = storedHoldings.find(i => i.id === c.id)?.quantity ?? 0;
    return new Holding(c, quantity);
  });
};

const addHolding = async (holding: Holding) => {
  let storedHoldings = await holdingsStorage.getHoldings();
  if (!storedHoldings) return;
  storedHoldings.push(_.pick(holding, ['id', 'quantity']));
  await holdingsStorage.setHoldings(storedHoldings);
};

const updateHoldingQuantity = async (id: string, quantity: number) => {
  let storedHoldings = await holdingsStorage.getHoldings();
  if (!storedHoldings) return;
  const updatedStoredHoldings = storedHoldings.map(h =>
    h.id === id ? {...h, quantity} : h,
  );
  await holdingsStorage.setHoldings(updatedStoredHoldings);
};

const deleteHolding = async (id: string) => {
  let storedHoldings = await holdingsStorage.getHoldings();
  if (!storedHoldings) return;
  const updatedStoredHoldings = storedHoldings.filter(h => h.id !== id);
  await holdingsStorage.setHoldings(updatedStoredHoldings);
};

export default {
  getHoldings,
  addHolding,
  updateHoldingQuantity,
  deleteHolding,
};

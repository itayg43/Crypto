import _ from 'lodash';

import {Holding} from '../entities/Holding';
import coinsService from './coinsService';
import holdingsStorage from '../storage/holdingsStorage';

const getHoldings = async () => {
  const storedHoldings = await holdingsStorage.getHoldings();
  if (_.isEmpty(storedHoldings)) {
    return [];
  }
  const ids = Object.values(storedHoldings)
    .map(i => i.id)
    .join(',');
  const coins = await coinsService.getCoinsByIds(ids);
  return coins.map(c => {
    const quantity = storedHoldings[c.id].quantity;
    return new Holding(c, quantity);
  });
};

const addHolding = async (holding: Holding) => {
  let storedHoldings = await holdingsStorage.getHoldings();
  storedHoldings[holding.id] = _.pick(holding, ['id', 'quantity']);
  await holdingsStorage.setHoldings(storedHoldings);
};

const updateHoldingQuantity = async (id: string, quantity: number) => {
  let storedHoldings = await holdingsStorage.getHoldings();
  storedHoldings[id].quantity = quantity;
  await holdingsStorage.setHoldings(storedHoldings);
};

const deleteHolding = async (id: string) => {
  let storedHoldings = await holdingsStorage.getHoldings();
  delete storedHoldings[id];
  await holdingsStorage.setHoldings(storedHoldings);
};

export default {
  getHoldings,
  addHolding,
  updateHoldingQuantity,
  deleteHolding,
};

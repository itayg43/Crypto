import {Holding} from '../entities/Holding';
import {HoldingJSON} from '../interfaces/HoldingJSON';
import coinsService from './coinsService';

const storedHoldings: HoldingJSON[] = [
  {id: 'ethereum', quantity: 1},
  {id: 'bitcoin', quantity: 2},
];

const getHoldings = async () => {
  const ids = storedHoldings.map(i => i.id).join(',');
  const coins = await coinsService.getCoinsByIds(ids);
  return coins.map((c, i) => new Holding(c, storedHoldings[i].quantity));
};

export default {
  getHoldings,
};

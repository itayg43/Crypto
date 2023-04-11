import {Holding} from '../entities/Holding';
import {HoldingJSON} from '../interfaces/HoldingJSON';
import coinsService from './coinsService';

const storedHoldings: HoldingJSON[] = [
  {id: 'ethereum', quantity: 1},
  {id: 'bitcoin', quantity: 1},
];

const getHoldings = async () => {
  if (storedHoldings.length === 0) {
    return [];
  }
  const ids = storedHoldings.map(i => i.id).join(',');
  const coinsJSON = await coinsService.getCoinsJSONByIds(ids);
  return coinsJSON.map(c => {
    const quantity = storedHoldings.find(i => i.id === c.id)?.quantity ?? 0;
    return new Holding(c, quantity);
  });
};

export default {
  getHoldings,
};

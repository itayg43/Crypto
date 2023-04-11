import {Holding} from '../entities/Holding';
import coinsService from './coinsService';
import holdingsStorage from '../storage/holdingsStorage';

const getHoldings = async () => {
  const storedHoldings = await holdingsStorage.getHoldings();
  if (!storedHoldings) {
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

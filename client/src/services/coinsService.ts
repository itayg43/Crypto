import {coinGeckoClient} from '../clients';
import {Coin} from '../entities/Coin';
import {CoinJSON} from '../interfaces/CoinJSON';

const getCoins = async () => {
  const {data} = await coinGeckoClient.get<CoinJSON[]>(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=7d&locale=en`,
  );
  return data.map(i => new Coin(i));
};

const getCoinsByIds = async (ids: string) => {
  const {data} = await coinGeckoClient.get<CoinJSON[]>(
    `/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d&locale=en`,
  );
  return data.map(i => new Coin(i));
};

export default {
  getCoins,
  getCoinsByIds,
};

import {coinGeckoClient} from '../clients';
import {Coin} from '../entities/Coin';

export interface CoinJSON {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_7d_in_currency: number;
  sparkline_in_7d: {
    price: number[];
  };
}

const getCoins = async () => {
  const {data} = await coinGeckoClient.get<CoinJSON[]>(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=true&price_change_percentage=7d&locale=en`,
  );
  return data.map(dataJSON => new Coin(dataJSON));
};

const getCoinsByIds = async (ids: string) => {
  const {data} = await coinGeckoClient.get<CoinJSON[]>(
    `/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=25&page=1&sparkline=true&price_change_percentage=7d&locale=en`,
  );
  return data.map(dataJSON => new Coin(dataJSON));
};

export default {
  getCoins,
  getCoinsByIds,
};

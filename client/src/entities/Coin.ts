import {CoinJSON} from '../interfaces/CoinJSON';

export class Coin {
  id: string;
  symbol: string;
  name: string;
  imageURL: string;
  currentPrice: number;
  priceChangePercentage7Days: number;
  sparklineIn7Days: number[];

  constructor(coinJSON: CoinJSON) {
    this.id = coinJSON.id;
    this.symbol = coinJSON.symbol;
    this.name = coinJSON.name;
    this.imageURL = coinJSON.image;
    this.currentPrice = coinJSON.current_price;
    this.priceChangePercentage7Days =
      coinJSON.price_change_percentage_7d_in_currency;
    this.sparklineIn7Days = coinJSON.sparkline_in_7d.price;
  }
}

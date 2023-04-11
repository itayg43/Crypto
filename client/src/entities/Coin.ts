import {CoinJSON} from '../interfaces/CoinJSON';

export class Coin {
  id: string;
  symbol: string;
  name: string;
  imageURL: string;
  price: number;
  priceChangePercentage7Days: number;
  priceSparklineIn7Days: number[];

  constructor(coinJSON: CoinJSON) {
    this.id = coinJSON.id;
    this.symbol = coinJSON.symbol;
    this.name = coinJSON.name;
    this.imageURL = coinJSON.image;
    this.price = coinJSON.current_price;
    this.priceChangePercentage7Days =
      coinJSON.price_change_percentage_7d_in_currency;
    this.priceSparklineIn7Days = coinJSON.sparkline_in_7d.price;
  }
}

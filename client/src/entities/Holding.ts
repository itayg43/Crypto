import {Coin} from './Coin';
import {Sparkline} from '../interfaces/Sparkline';

export class Holding {
  id: number;
  cid: string;
  symbol: string;
  name: string;
  logoURL: string;
  price: number;
  priceChangePercentageIn7Days: number;
  price7DaysAgo: number;
  quantity: number;
  priceSparklineIn7Days: Sparkline[];

  constructor(id: number, coin: Coin, quantity: number) {
    this.id = id;
    this.cid = coin.id;
    this.symbol = coin.symbol;
    this.name = coin.name;
    this.logoURL = coin.logoURL;
    this.price = coin.price;
    this.priceChangePercentageIn7Days = coin.priceChangePercentageIn7Days;
    this.price7DaysAgo = coin.price7DaysAgo;
    this.priceSparklineIn7Days = coin.priceSparklineIn7Days;
    this.quantity = quantity;
  }

  getValue() {
    return this.price * this.quantity;
  }

  getValueChangeIn7Days() {
    return (this.price - this.price7DaysAgo) * this.quantity;
  }

  updateQuantity(quantity: number) {
    this.quantity = quantity;
  }
}

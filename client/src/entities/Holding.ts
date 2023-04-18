import {Coin} from './Coin';

export class Holding {
  id: string;
  symbol: string;
  name: string;
  logoURL: string;
  price: number;
  priceChangePercentageIn7Days: number;
  price7DaysAgo: number;
  quantity: number;

  constructor(coin: Coin, quantity: number) {
    this.id = coin.id;
    this.symbol = coin.symbol;
    this.name = coin.name;
    this.logoURL = coin.logoURL;
    this.price = coin.price;
    this.priceChangePercentageIn7Days = coin.priceChangePercentageIn7Days;
    this.price7DaysAgo = coin.price7DaysAgo;
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

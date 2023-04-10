import {Coin} from './Coin';

export class Holding {
  id: string;
  symbol: string;
  name: string;
  imageURL: string;
  currentPrice: number;
  priceChangePercentage7Days: number;
  sparkline7Days: number[];
  quantity: number;

  constructor(coin: Coin, quantity: number) {
    this.id = coin.id;
    this.symbol = coin.symbol;
    this.name = coin.name;
    this.imageURL = coin.imageURL;
    this.currentPrice = coin.currentPrice;
    this.priceChangePercentage7Days = coin.priceChangePercentage7Days;
    this.sparkline7Days = coin.sparkline7Days;
    this.quantity = quantity;
  }

  getValue() {
    return this.currentPrice * this.quantity;
  }
}

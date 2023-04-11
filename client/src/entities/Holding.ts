import {Coin} from './Coin';
import {CoinJSON} from '../interfaces/CoinJSON';

export class Holding extends Coin {
  quantity: number;

  constructor(coinJSON: CoinJSON, quantity: number) {
    super(coinJSON);
    this.quantity = quantity;
  }

  getValue() {
    return this.currentPrice * this.quantity;
  }
}

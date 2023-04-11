import {Coin} from './Coin';
import {CoinJSON} from '../interfaces/CoinJSON';

export class Holding extends Coin {
  price7DaysAgo: number;
  quantity: number;
  valueChangeIn7Days: number;
  valueSparklineIn7Days: number[];

  constructor(coinJSON: CoinJSON, quantity: number) {
    super(coinJSON);
    this.price7DaysAgo = this._calculatePrice7DaysAgo();
    this.quantity = quantity;
    this.valueChangeIn7Days = this._calculateValueChangeIn7Days();
    this.valueSparklineIn7Days = this._calculateValueSparklineIn7Days();
  }

  private _calculatePrice7DaysAgo() {
    return this.currentPrice / (1 + this.priceChangePercentage7Days * 0.01);
  }

  private _calculateValueChangeIn7Days() {
    return (this.currentPrice - this.price7DaysAgo) * this.quantity;
  }

  private _calculateValueSparklineIn7Days() {
    return this.sparkline7Days.map(v => v * this.quantity);
  }

  getValue() {
    return this.currentPrice * this.quantity;
  }
}

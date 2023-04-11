import {Coin} from './Coin';
import {CoinJSON} from '../interfaces/CoinJSON';

export class Holding extends Coin {
  quantity: number;
  value: number;
  valueChangeIn7Days: number;
  valueSparklineIn7Days: number[];

  constructor(coinJSON: CoinJSON, quantity: number) {
    super(coinJSON);
    this.quantity = quantity;
    this.value = this._calculateValue();
    this.valueChangeIn7Days = this._calculateValueChangeIn7Days();
    this.valueSparklineIn7Days = this._calculateValueSparklineIn7Days();
  }

  private _calculateValue() {
    return this.price * this.quantity;
  }

  private _calculateValueChangeIn7Days() {
    const price7DaysAgo =
      this.price / (1 + this.priceChangePercentage7Days * 0.01);
    return (this.price - price7DaysAgo) * this.quantity;
  }

  private _calculateValueSparklineIn7Days() {
    return this.priceSparklineIn7Days.map(v => v * this.quantity);
  }
}

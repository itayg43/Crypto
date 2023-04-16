import {Coin} from './Coin';
import {CoinJSON} from '../interfaces/CoinJSON';
import {Sparkline} from '../interfaces/Sparkline';

export class Holding extends Coin {
  quantity: number;
  value: number;
  valueChangeIn7Days: number;
  valueSparklineIn7Days: Sparkline[];

  constructor(j: CoinJSON, quantity: number) {
    super(j);
    this.quantity = quantity;
    this.value = this._initValue();
    this.valueChangeIn7Days = this._initValueChangeIn7Days();
    this.valueSparklineIn7Days = this._initValueSparklineIn7Days();
  }

  private _initValue() {
    return this.price * this.quantity;
  }

  private _initValueChangeIn7Days() {
    return (this.price - this.price7DaysAgo) * this.quantity;
  }

  private _initValueSparklineIn7Days(): Sparkline[] {
    return this.priceSparklineIn7Days.map(v => ({
      x: v.x,
      y: v.y * this.quantity,
    }));
  }
}

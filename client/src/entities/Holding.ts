import {Coin} from './Coin';
import {CoinJSON} from '../interfaces/CoinJSON';

interface ValueSparkline {
  x: number;
  y: number;
}

export class Holding extends Coin {
  quantity: number;
  value: number;
  valueChangeIn7Days: number;
  valueSparklineIn7Days: ValueSparkline[];

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

  private _initValueSparklineIn7Days(): ValueSparkline[] {
    return this.priceSparklineIn7Days.map(v => ({
      x: v.x,
      y: v.y * this.quantity,
    }));
  }
}

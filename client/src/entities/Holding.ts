import {Coin} from './Coin';
import {CoinJSON} from '../interfaces/CoinJSON';
import {SparklineData, SparklineDataRange} from '../interfaces/Sparkline';

export class Holding extends Coin {
  quantity: number;
  value: number;
  valueChangeIn7Days: number;
  valueSparklineIn7Days: SparklineData[];
  valueRangeIn7Days: SparklineDataRange;

  constructor(j: CoinJSON, quantity: number) {
    super(j);
    this.quantity = quantity;
    this.value = this._initValue();
    this.valueChangeIn7Days = this._initValueChangeIn7Days();
    this.valueSparklineIn7Days = this._initValueSparklineIn7Days();
    this.valueRangeIn7Days = this._initValueRangeIn7Days();
  }

  private _initValue() {
    return this.price * this.quantity;
  }

  private _initValueChangeIn7Days() {
    return (this.price - this.price7DaysAgo) * this.quantity;
  }

  private _initValueSparklineIn7Days(): SparklineData[] {
    return this.priceSparklineIn7Days.map(v => ({
      x: v.x,
      y: v.y * this.quantity,
    }));
  }

  private _initValueRangeIn7Days(): SparklineDataRange {
    const valueSparkline = this.valueSparklineIn7Days;
    const range = valueSparkline.reduce(
      (result, value) => ({
        max: Math.max(result.max, value.y),
        min: Math.min(result.min, value.y),
      }),
      {max: valueSparkline[0].y, min: valueSparkline[0].y},
    );
    return {
      ...range,
      mid: (range.max + range.min) / 2,
    };
  }
}

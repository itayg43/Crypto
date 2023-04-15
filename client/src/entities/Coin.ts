import moment from 'moment';

import {CoinJSON} from '../interfaces/CoinJSON';
import {SparklineDataRange, SparklineData} from '../interfaces/Sparkline';

export class Coin {
  id: string;
  symbol: string;
  name: string;
  imageURL: string;
  marketCapRank: number;
  price: number;
  priceRangeIn7Days: SparklineDataRange;
  priceChangePercentageIn7Days: number;
  price7DaysAgo: number;
  priceSparklineIn7Days: SparklineData[];

  constructor(j: CoinJSON) {
    this.id = j.id;
    this.symbol = j.symbol;
    this.name = j.name;
    this.imageURL = j.image;
    this.marketCapRank = j.market_cap_rank;
    this.price = j.current_price;
    this.priceRangeIn7Days = this._initPriceRangeIn7Days(
      j.sparkline_in_7d.price,
    );
    this.priceChangePercentageIn7Days =
      j.price_change_percentage_7d_in_currency;
    this.price7DaysAgo = this._initPrice7DaysAgo();
    this.priceSparklineIn7Days = this._initPriceSparklineIn7Days(
      j.sparkline_in_7d.price,
    );
  }

  private _initPriceRangeIn7Days(sparkline: number[]): SparklineDataRange {
    const range = sparkline.reduce(
      (result, value) => ({
        max: Math.max(result.max, value),
        min: Math.min(result.min, value),
      }),
      {max: sparkline[0], min: sparkline[0]},
    );
    return {
      ...range,
      mid: (range.max + range.min) / 2,
    };
  }

  private _initPrice7DaysAgo() {
    return this.price / (1 + this.priceChangePercentageIn7Days * 0.01);
  }

  private _initPriceSparklineIn7Days(sparkline: number[]): SparklineData[] {
    const timestamp7DaysAgo = moment().subtract(7, 'day').unix();
    return sparkline.map((v, i) => ({
      x: timestamp7DaysAgo + (i + 1) * 3600,
      y: v,
    }));
  }
}

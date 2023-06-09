import moment from 'moment';

import {CoinJSON} from '../interfaces/CoinJSON';
import {Sparkline} from '../interfaces/Sparkline';

export class Coin {
  id: string;
  symbol: string;
  name: string;
  logoURL: string;
  price: number;
  priceChangePercentageIn7Days: number;
  price7DaysAgo: number;
  priceSparklineIn7Days: Sparkline[];

  constructor(j: CoinJSON) {
    this.id = j.id;
    this.symbol = j.symbol;
    this.name = j.name;
    this.logoURL = j.image;
    this.price = j.current_price;
    this.priceChangePercentageIn7Days =
      j.price_change_percentage_7d_in_currency;
    this.price7DaysAgo = this._initPrice7DaysAgo();
    this.priceSparklineIn7Days = this._initPriceSparklineIn7Days(
      j.sparkline_in_7d.price,
    );
  }

  private _initPrice7DaysAgo() {
    return this.price / (1 + this.priceChangePercentageIn7Days * 0.01);
  }

  private _initPriceSparklineIn7Days(sparkline: number[]): Sparkline[] {
    const timestamp7DaysAgo = moment().subtract(7, 'day').unix();
    return sparkline.map((v, i) => ({
      x: timestamp7DaysAgo + (i + 1) * 3600,
      y: v,
    }));
  }
}

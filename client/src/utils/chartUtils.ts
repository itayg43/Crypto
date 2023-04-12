import moment from 'moment';

import {Coin} from '../entities/Coin';

const findPricesRange = (values: number[]) => {
  const range = values.reduce(
    (result, value) => {
      return [Math.max(result[0], value), Math.min(result[1], value)];
    },
    [values[0], values[0]],
  );
  const mid = (range[0] + range[1]) / 2;
  range.splice(1, 0, mid);
  return range;
};

const prepareData = (coin: Coin) => {
  const startTimestamp = moment().subtract(7, 'day').unix();
  return coin.priceSparklineIn7Days.map((p, i) => ({
    x: startTimestamp + (i + 1) * 3600,
    y: p,
  }));
};

const formatPrice = (value: string) => {
  'worklet';
  if (Number.isNaN(value)) {
    return '0';
  }
  const num = Number.parseFloat(value);
  return `${num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}`;
};

const formatDate = (timestamp: number) => {
  'worklet';
  const millisecond = 1000;
  const date = new Date(timestamp * millisecond);
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  return `${day}/${month}`;
};

export default {
  findPricesRange,
  prepareData,
  formatPrice,
  formatDate,
};

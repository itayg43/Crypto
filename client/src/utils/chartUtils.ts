import moment from 'moment';

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

const preparePricesData = (values: number[]) => {
  const startTimestamp = moment().subtract(7, 'day').unix();
  return values.map((p, i) => ({
    x: startTimestamp + (i + 1) * 3600,
    y: p,
  }));
};

const prepareData = (values: number[]) => {
  const pricesRange = findPricesRange(values);
  const pricesData = preparePricesData(values);
  return {
    pricesRange,
    pricesData,
  };
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
  prepareData,
  formatPrice,
  formatDate,
};

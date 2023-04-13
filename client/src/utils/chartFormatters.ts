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
  formatPrice,
  formatDate,
};

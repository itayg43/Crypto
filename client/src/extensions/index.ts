const b = 1e9;
const m = 1e6;
const k = 1e3;

Number.prototype.toUSDString = (value: number) => {
  return `${value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}`;
};

Number.prototype.toAbsFixedString = (value: number) => {
  return Math.abs(value).toFixed(2);
};

Number.prototype.toBMKString = (value: number) => {
  if (value > b) {
    return `$${(value / b).toFixed(2)}B`;
  }
  if (value > m) {
    return `$${(value / m).toFixed(2)}M`;
  }
  if (value > k) {
    return `$${(value / k).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
};

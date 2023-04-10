import React, {useMemo} from 'react';
import {Dimensions} from 'react-native';
import {
  Chart as LineChart,
  Line,
  Area,
  Tooltip,
} from 'react-native-responsive-linechart';
import moment from 'moment';

import {Coin} from '../entities/Coin';

interface Props {
  coin: Coin;
}

const width = Dimensions.get('window').width;

const Chart = ({coin}: Props) => {
  const prices = useMemo(() => preparePrices(coin), [coin]);
  const lineColor = coin.priceChangePercentage7Days >= 0 ? '#44bd32' : 'red';

  return (
    <LineChart
      style={{height: 350, width}}
      data={prices}
      padding={{left: 0, bottom: 40, right: 0, top: 40}}>
      <Area
        theme={{
          gradient: {
            from: {color: lineColor},
            to: {color: lineColor, opacity: 0.2},
          },
        }}
      />
      <Line
        theme={{stroke: {color: lineColor, width: 3}}}
        tooltipComponent={
          <Tooltip
            theme={{
              shape: {
                width: 100,
                height: 30,
                dx: 0,
                dy: 20,
                rx: 4,
                color: 'black',
              },
              formatter: ({y}) => formatPriceToLocalString(y),
            }}
          />
        }
      />
    </LineChart>
  );
};

function preparePrices(coin: Coin) {
  const startTimestamp = moment().subtract(7, 'day').unix();
  return coin.sparkline7Days.map((p, i) => ({
    x: startTimestamp + (i + 1) * 3600,
    y: p,
  }));
}

// function formatPrice(price: number) {
//   if (price > 1e9) {
//     return `$${(price / 1e9).toFixed(2)}B`;
//   }
//   if (price > 1e6) {
//     return `$${(price / 1e6).toFixed(2)}M`;
//   }
//   if (price > 1e3) {
//     return `$${(price / 1e3).toFixed(2)}K`;
//   }
//   return `$${price.toFixed(2)}`;
// }

function formatPriceToLocalString(price: number) {
  return `${price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}`;
}

// function formatDate(timestamp: number) {
//   const date = new Date(timestamp * 1000);
//   const day = `0${date.getDate()}`.slice(-2);
//   const month = `0${date.getMonth() + 1}`.slice(-2);
//   return `${day}/${month}`;
// }

export default Chart;

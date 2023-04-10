import React, {useMemo} from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  Chart as LineChart,
  Line,
  Area,
  Tooltip,
} from 'react-native-responsive-linechart';
import moment from 'moment';

import {Coin} from '../entities/Coin';

interface Props {
  contentContainerStyle?: StyleProp<ViewStyle>;
  coin: Coin;
}

const width = Dimensions.get('window').width;

const Chart = ({contentContainerStyle, coin}: Props) => {
  const maxPrice = useMemo(() => Math.max(...coin.sparkline7Days), [coin]);
  const minPrice = useMemo(() => Math.min(...coin.sparkline7Days), [coin]);
  const prices = useMemo(() => preparePrices(coin), [coin]);
  const lineColor = coin.priceChangePercentage7Days >= 0 ? '#44bd32' : 'red';

  return (
    <View style={contentContainerStyle}>
      <View style={styles.maxAndMinPricesContainer}>
        <Text style={styles.price}>{formatPrice(maxPrice)}</Text>
        <Text style={styles.price}>{formatPrice(minPrice)}</Text>
      </View>

      <LineChart style={{height: 300, width}} data={prices}>
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
    </View>
  );
};

function preparePrices(coin: Coin) {
  const startTimestamp = moment().subtract(7, 'day').unix();
  return coin.sparkline7Days.map((p, i) => ({
    x: startTimestamp + (i + 1) * 3600,
    y: p,
  }));
}

function formatPrice(price: number) {
  if (price > 1e9) {
    return `$${(price / 1e9).toFixed(2)}B`;
  }
  if (price > 1e6) {
    return `$${(price / 1e6).toFixed(2)}M`;
  }
  if (price > 1e3) {
    return `$${(price / 1e3).toFixed(2)}K`;
  }
  return `$${price.toFixed(2)}`;
}

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

const styles = StyleSheet.create({
  maxAndMinPricesContainer: {
    position: 'absolute',
    top: 0,
    left: 10,
    bottom: 0,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  price: {
    color: 'gray',
  },
});

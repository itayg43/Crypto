import React, {useCallback, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  StyleProp,
  ViewStyle,
  Text,
  Image,
} from 'react-native';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';
import {useSharedValue} from 'react-native-reanimated';

import {Coin} from '../entities/Coin';
import {Holding} from '../entities/Holding';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  item: Coin | Holding;
}

const width = Dimensions.get('window').width;

const formatDate = (value: number) => {
  'worklet';
  const millisecond = 1000;
  let date = new Date(value * millisecond);
  if (date.getFullYear() === 1970) {
    date = new Date();
  }
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const hour = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  return `${day}/${month}, ${hour}:${minutes}`;
};

const LineChart = ({containerStyle, item}: Props) => {
  const sharedPrice = useSharedValue(item.price);

  const points = useMemo(
    () =>
      monotoneCubicInterpolation({data: item.priceSparklineIn7Days, range: 40}),
    [item.priceSparklineIn7Days],
  );

  const formatPrice = useCallback(
    (value: string) => {
      'worklet';
      if (value === '') {
        return `${sharedPrice.value.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}`;
      }
      const num = Number.parseFloat(value);
      return `${num.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })}`;
    },
    [sharedPrice.value],
  );

  useEffect(() => {
    sharedPrice.value = item.price;
  }, [item.price]);

  return (
    <View style={containerStyle}>
      <ChartPathProvider data={{points, smoothingStrategy: 'bezier'}}>
        {/** header */}
        <View style={styles.headerContainer}>
          {/** logo & name & symbol */}
          <View style={styles.headerLeftContainer}>
            {/** logo */}
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={{uri: item.logoURL}} />
            </View>

            {/** name & symbol */}
            <View style={styles.nameContainer}>
              <Text>{item.name}</Text>
              <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
            </View>
          </View>

          {/** price & date */}
          <View style={styles.headerRightContainer}>
            <ChartYLabel format={formatPrice} />
            <ChartXLabel style={styles.date} format={formatDate} />
          </View>
        </View>

        {/** chart */}
        <View>
          <ChartPath
            width={width}
            height={width / 2}
            stroke="black"
            strokeWidth={2}
          />
          <ChartDot style={styles.dot} />
        </View>
      </ChartPathProvider>
    </View>
  );
};

export default LineChart;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },

  // header left
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 40,
    height: 40,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  nameContainer: {
    marginLeft: 10,
  },
  symbol: {
    color: 'gray',
  },

  // header right
  headerRightContainer: {
    alignItems: 'flex-end',
  },
  date: {
    color: 'gray',
  },

  dot: {
    backgroundColor: 'black',
  },
});

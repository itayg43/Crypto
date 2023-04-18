import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Coin} from '../entities/Coin';
import {Holding} from '../entities/Holding';

interface Props {
  item: Coin | Holding;
  onSelect: () => void;
}

const CoinListItem = ({item, onSelect}: Props) => {
  const isHoldingInstance = item instanceof Holding;

  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <NameSection
        rank={item.marketCapRank}
        logoURL={item.logoURL}
        name={item.name}
        symbol={item.symbol}
      />

      <PriceSection
        price={item.price}
        priceChangePercentage={item.priceChangePercentageIn24Hours}
      />

      {isHoldingInstance && (
        <ValueSection value={item.value} quantity={item.quantity} />
      )}
    </TouchableOpacity>
  );
};

export default CoinListItem;

interface NameSectionProps {
  rank: number;
  logoURL: string;
  name: string;
  symbol: string;
}

const NameSection = ({rank, logoURL, name, symbol}: NameSectionProps) => {
  return (
    <View style={styles.nameSectionContainer}>
      {/** rank */}
      <View style={styles.rankContainer}>
        <Text>{rank.toString()}</Text>
      </View>

      {/** logo */}
      <View style={styles.logoContaienr}>
        <Image style={styles.logo} source={{uri: logoURL}} />
      </View>

      {/** name & symbol */}
      <View style={styles.titlesContainer}>
        <Text>{name}</Text>
        <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
      </View>
    </View>
  );
};

interface PriceSectionProps {
  price: number;
  priceChangePercentage: number;
}

const PriceSection = ({price, priceChangePercentage}: PriceSectionProps) => {
  const isChangePositive = priceChangePercentage >= 0;
  const changeIcon = isChangePositive ? 'arrow-up' : 'arrow-down';
  const changeColor = isChangePositive ? 'green' : 'red';

  return (
    <View style={styles.priceSectionContainer}>
      {/** price */}
      <Text>{price.toUSDString(price)}</Text>

      {/** price change percentage */}
      <View style={styles.priceChangePercentageContainer}>
        <MaterialCommunityIcons name={changeIcon} color={changeColor} />

        <Text style={{color: changeColor}}>
          {priceChangePercentage.toAbsFixedString(priceChangePercentage)}%
        </Text>
      </View>
    </View>
  );
};

interface ValueSectionProps {
  value: number;
  quantity: number;
}

const ValueSection = ({value, quantity}: ValueSectionProps) => {
  return (
    <View style={styles.valueSectionContainer}>
      <Text>{value.toUSDString(value)}</Text>
      <Text>x{quantity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },

  nameSectionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankContainer: {
    width: 20,
  },
  logoContaienr: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  titlesContainer: {
    marginLeft: 10,
  },
  symbol: {
    color: 'gray',
  },

  priceSectionContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  priceChangePercentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  valueSectionContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

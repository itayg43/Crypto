import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Coin} from '../entities/Coin';

interface Props {
  item: Coin;
  onSelect: () => void;
}

const CoinListItem = ({item, onSelect}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <LeftSection
        rank={item.marketCapRank}
        imageURL={item.imageURL}
        name={item.name}
        symbol={item.symbol}
      />

      <RightSection
        price={item.price}
        priceChangePercentage={item.priceChangePercentageIn7Days}
      />
    </TouchableOpacity>
  );
};

export default CoinListItem;

interface LeftSectionProps {
  rank: number;
  imageURL: string;
  name: string;
  symbol: string;
}

function LeftSection({rank, imageURL, name, symbol}: LeftSectionProps) {
  return (
    <View style={styles.leftSectionContainer}>
      {/** rank */}
      <View style={styles.rankContainer}>
        <Text style={styles.rank}>{rank.toString()}</Text>
      </View>

      {/** logo */}
      <View style={styles.logoContaienr}>
        <Image style={styles.logo} source={{uri: imageURL}} />
      </View>

      {/** name & symbol */}
      <View style={styles.titlesContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
      </View>
    </View>
  );
}

interface RightSectionProps {
  price: number;
  priceChangePercentage: number;
}

function RightSection({price, priceChangePercentage}: RightSectionProps) {
  const isChangePositive = priceChangePercentage >= 0;
  const changeIcon = isChangePositive ? 'arrow-up' : 'arrow-down';
  const changeColor = isChangePositive ? 'green' : 'red';

  return (
    <View style={styles.rightSectionContainer}>
      {/** price */}
      <Text style={styles.price}>{price.toUSDString(price)}</Text>

      {/** price change percentage */}
      <View style={styles.priceChangePercentageContainer}>
        <MaterialCommunityIcons name={changeIcon} color={changeColor} />

        {/** percentage */}
        <Text style={{color: changeColor}}>
          {priceChangePercentage.toAbsFixedString(priceChangePercentage)}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },

  // left section
  leftSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankContainer: {
    width: 20,
  },
  rank: {
    color: 'gray',
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
  name: {
    color: 'white',
  },
  symbol: {
    color: 'gray',
  },

  // right section
  rightSectionContainer: {
    alignItems: 'flex-end',
  },
  price: {
    color: 'white',
  },
  priceChangePercentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

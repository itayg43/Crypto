import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Holding} from '../entities/Holding';

interface Props {
  item: Holding;
  onSelect: () => void;
}

const HoldingListItem = ({item, onSelect}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <LeftSection
        rank={item.marketCapRank}
        imageURL={item.imageURL}
        name={item.name}
        symbol={item.symbol}
      />

      <MiddleSection
        price={item.price}
        priceChangePercentage={item.priceChangePercentageIn7Days}
      />

      <RightSection value={item.value} />
    </TouchableOpacity>
  );
};

export default HoldingListItem;

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
        <Text>{rank.toString()}</Text>
      </View>

      {/** logo */}
      <View style={styles.logoContaienr}>
        <Image style={styles.logo} source={{uri: imageURL}} />
      </View>

      {/** name & symbol */}
      <View style={styles.titlesContainer}>
        <Text>{name}</Text>
        <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
      </View>
    </View>
  );
}

interface MiddleSectionProps {
  price: number;
  priceChangePercentage: number;
}

function MiddleSection({price, priceChangePercentage}: MiddleSectionProps) {
  const isChangePositive = priceChangePercentage >= 0;
  const changeIcon = isChangePositive ? 'arrow-up' : 'arrow-down';
  const changeColor = isChangePositive ? 'green' : 'red';

  return (
    <View style={styles.middleSectionContainer}>
      {/** price */}
      <Text>{price.toUSDString(price)}</Text>

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

interface RightSectionProps {
  value: number;
}

function RightSection({value}: RightSectionProps) {
  return (
    <View style={styles.rightSectionContainer}>
      <Text>{value.toUSDString(value)}</Text>
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

  // middle section
  middleSectionContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  priceChangePercentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // right section
  rightSectionContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

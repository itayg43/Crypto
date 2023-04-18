import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Coin} from '../entities/Coin';
import {Holding} from '../entities/Holding';
import BottomSheet from './BottomSheet';
import LineChart from './LineChart';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  item: Coin | Holding;
}

const CoinBottomSheet = ({isVisible, onClose, item}: Props) => {
  const isHoldingInstance = item instanceof Holding;

  return (
    <BottomSheet isVisible={isVisible} onClose={onClose}>
      <HeaderSection
        logoURL={item.logoURL}
        name={item.name}
        symbol={item.symbol}
        priceChangePercentage={item.priceChangePercentageIn7Days}
      />

      <LineChart
        data={
          isHoldingInstance
            ? item.valueSparklineIn7Days
            : item.priceSparklineIn7Days
        }
      />
    </BottomSheet>
  );
};

interface HeaderSectionProps {
  logoURL: string;
  name: string;
  symbol: string;
  priceChangePercentage: number;
}

const HeaderSection = ({
  logoURL,
  name,
  symbol,
  priceChangePercentage,
}: HeaderSectionProps) => {
  return (
    <View style={styles.headerSectionContainer}>
      <HeaderLeftSection logoURL={logoURL} name={name} symbol={symbol} />
      <HeaderRightSection priceChangePercentage={priceChangePercentage} />
    </View>
  );
};

interface HeaderLeftSectionProps {
  logoURL: string;
  name: string;
  symbol: string;
}

const HeaderLeftSection = ({logoURL, name, symbol}: HeaderLeftSectionProps) => {
  return (
    <View style={styles.headerLeftSectionContainer}>
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

interface HeaderRightSectionProps {
  priceChangePercentage: number;
}

const HeaderRightSection = ({
  priceChangePercentage,
}: HeaderRightSectionProps) => {
  const isChangePositive = priceChangePercentage >= 0;
  const changeColor = isChangePositive ? 'green' : 'red';
  const changeIcon = isChangePositive ? 'arrow-up' : 'arrow-down';

  return (
    <View style={styles.headerRightSectionContainer}>
      <MaterialCommunityIcons name={changeIcon} color={changeColor} />

      {/** percentage */}
      <Text style={{color: changeColor}}>
        {priceChangePercentage.toAbsFixedString(priceChangePercentage)}%
      </Text>

      {/** period */}
      <Text style={styles.priceChangePercentagePeriod}>(7 Days)</Text>
    </View>
  );
};

export default CoinBottomSheet;

const styles = StyleSheet.create({
  headerSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },

  headerLeftSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContaienr: {
    width: 40,
    height: 40,
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

  headerRightSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceChangePercentagePeriod: {
    color: 'gray',
    marginLeft: 5,
  },
});

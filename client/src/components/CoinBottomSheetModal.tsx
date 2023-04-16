import React, {useCallback, useEffect, useRef} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Coin} from '../entities/Coin';
import LineChart from '../components/LineChart';

interface Props {
  isVisible: boolean;
  onDismiss: () => void;
  coin: Coin;
}

const CoinBottomSheetModal = ({isVisible, onDismiss, coin}: Props) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const modalSnapPoints = ['50%'];

  const handlePresetModal = useCallback(() => {
    modalRef.current?.present();
  }, [modalRef]);

  useEffect(() => {
    if (isVisible) {
      handlePresetModal();
    }

    return () => onDismiss();
  }, [isVisible, handlePresetModal]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={modalRef}
        snapPoints={modalSnapPoints}
        index={0}
        style={styles.container}>
        <HeaderSection
          logoURL={coin.logoURL}
          name={coin.name}
          symbol={coin.symbol}
          priceChangePercentage={coin.priceChangePercentageIn7Days}
        />

        <LineChart data={coin.priceSparklineIn7Days} />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

interface HeaderSectionProps {
  logoURL: string;
  name: string;
  symbol: string;
  priceChangePercentage: number;
}

function HeaderSection({
  logoURL,
  name,
  symbol,
  priceChangePercentage,
}: HeaderSectionProps) {
  return (
    <View style={styles.headerSectionContainer}>
      <HeaderLeftSection logoURL={logoURL} name={name} symbol={symbol} />
      <HeaderRightSection priceChangePercentage={priceChangePercentage} />
    </View>
  );
}

interface HeaderLeftSectionProps {
  logoURL: string;
  name: string;
  symbol: string;
}

function HeaderLeftSection({logoURL, name, symbol}: HeaderLeftSectionProps) {
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
}

interface HeaderRightSectionProps {
  priceChangePercentage: number;
}

function HeaderRightSection({priceChangePercentage}: HeaderRightSectionProps) {
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
}

export default CoinBottomSheetModal;

const styles = StyleSheet.create({
  container: {
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

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

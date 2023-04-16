import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {CoinsScreenNavigationProp} from '../navigation/CoinsStackNavigator';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {selectFilteredCoins} from '../redux/coins/coinsSelectors';
import {updateSearchQuery} from '../redux/coins/coinsSlice';
import {Coin} from '../entities/Coin';
import useDebounce from '../hooks/useDebounce';
import SafeView from '../components/SafeView';
import CoinList from '../components/CoinList';
import LineChart from '../components/LineChart';

const CoinsScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<CoinsScreenNavigationProp>();

  const filteredCoins = useAppSelector(selectFilteredCoins);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalSnapPoints = useMemo(() => ['50%'], []);

  const handlePresetBottomSheetModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef]);

  const handleCoinSelection = useCallback(
    (coin: Coin) => {
      setSelectedCoin(currentCoin =>
        currentCoin?.id !== coin.id ? coin : currentCoin,
      );
      handlePresetBottomSheetModal();
    },
    [setSelectedCoin, handlePresetBottomSheetModal],
  );

  const handleUpdateSearchQuery = useCallback(
    (query: string) => {
      dispatch(updateSearchQuery(query));
    },
    [dispatch],
  );

  useEffect(() => {
    handleUpdateSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: e => setSearchQuery(e.nativeEvent.text),
      },
    });
  }, [navigation, setSearchQuery]);

  return (
    <>
      <SafeView>
        {filteredCoins.length > 0 && (
          <CoinList
            listStyle={styles.coinList}
            data={filteredCoins}
            onSelectItem={handleCoinSelection}
          />
        )}
      </SafeView>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={bottomSheetModalSnapPoints}
          index={0}
          style={styles.bottomSheetModal}>
          {selectedCoin && (
            <>
              <HeaderSection
                logoURL={selectedCoin.logoURL}
                name={selectedCoin.name}
                symbol={selectedCoin.symbol}
                priceChangePercentage={
                  selectedCoin.priceChangePercentageIn7Days
                }
              />

              <LineChart data={selectedCoin.priceSparklineIn7Days} />
            </>
          )}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
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

      <Text style={{color: changeColor}}>
        {priceChangePercentage.toAbsFixedString(priceChangePercentage)}%
      </Text>

      <Text style={styles.priceChangePercentagePeriod}>(7 Days)</Text>
    </View>
  );
}

export default CoinsScreen;

const styles = StyleSheet.create({
  coinList: {
    paddingHorizontal: 10,
  },

  bottomSheetModal: {
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
